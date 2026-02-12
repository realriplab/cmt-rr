import { Context } from 'hono';
import { Bindings } from '../../bindings';
import { loadS3Settings } from '../../utils/s3Settings';
import { S3Client } from '../../utils/s3';
import { getConfigs } from './exportConfig';
import { getStatsData } from './exportStats';

export async function triggerS3Backup(c: Context<{ Bindings: Bindings }>) {
	try {
		// 1. Load S3 Settings
		const settings = await loadS3Settings(c.env);
		if (!settings.endpoint || !settings.bucket || !settings.accessKeyId || !settings.secretAccessKey) {
			return c.json({ message: 'S3 配置不完整，请先配置 S3 信息' }, 400);
		}

		// 2. Gather Backup Data (Logic from exportBackup.ts)
		const { results: comments } = await c.env.CWD_DB.prepare('SELECT * FROM Comment ORDER BY priority DESC, created DESC').all();
		const configs = await getConfigs(c.env);
		const stats = await getStatsData(c.env);

		const backupData = {
			version: '1.0',
			timestamp: Date.now(),
			comments: comments,
			settings: configs,
			page_stats: stats.page_stats,
			page_visit_daily: stats.page_visit_daily,
			likes: stats.likes,
		};

		const jsonString = JSON.stringify(backupData, null, 2);
		const dateStr = new Date().toISOString().split('T')[0];
		const fileName = `cwd-backup-${dateStr}-${Date.now()}.json`;

		// 3. Upload to S3
		const s3 = new S3Client({
			endpoint: settings.endpoint,
			accessKeyId: settings.accessKeyId,
			secretAccessKey: settings.secretAccessKey,
			bucket: settings.bucket,
			region: settings.region,
		});

		await s3.putObject(fileName, jsonString);

		return c.json({
			message: '备份成功',
			file: fileName,
		});
	} catch (e: any) {
		console.error('S3 Backup Error:', e);
		return c.json({ message: e.message || 'S3 备份失败' }, 500);
	}
}
