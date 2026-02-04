/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		qualities: [75, 85],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "enfycon.com",
			},
			{
				protocol: "https",
				hostname: "secure.gravatar.com",
			},
		],
	},
	compiler: {
		removeConsole:
			process.env.NODE_ENV === "production"
				? { exclude: ["error", "warn"] }
				: false,
	},
};


module.exports = nextConfig;
