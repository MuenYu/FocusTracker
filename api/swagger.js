import swaggerAutogen from 'swagger-autogen';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFilePromise = promisify(execFile);
const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js']; // 你的入口文件

const generateSwagger = async () => {
  await swaggerAutogen()(outputFile, endpointsFiles);
  await execFilePromise('node --env-file=.env.local', ['./app.js']); // 你的主文件
};

generateSwagger();
