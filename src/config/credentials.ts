export const MONGODB_HOST = process.env.MONGODB_HOST || '35.247.221.210:27017';
export const MONGODB_USER = process.env.MONGODB_USER || 'maestro';
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'eficimaestro';
export const MONGODB_AUTHDB = process.env.MONGODB_AUTHDB || 'crawler';

const URI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_AUTHDB}`;

console.log("URI: ", URI)

export const MONGODB_CONNECTIONSTRING = process.env.MONGODB_URI || URI
