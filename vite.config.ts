import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			react({
				babel: {
					plugins: [['babel-plugin-react-compiler']],
				},
			}),
			tailwindcss(),
		],
		server: {
			port: parseInt(env.PORT, 10),
		},
		resolve: {
			alias: {
				'@': '/src',
			},
		},
	};
});
