import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';
import 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

// 로그 파일 저장 디렉토리 경로 설정
const logDir = path.join(process.cwd(), 'logs');
console.log('로그 디렉토리 경로:', logDir);

// logs 디렉토리가 없으면 생성
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

export const winstonConfig: winston.LoggerOptions = {
    // 전체 로깅 최소 수준 설정 (info 이상만 기록됨)
    level: 'info',

    // 모든 로그의 공통 포맷 설정
    format: winston.format.combine(
        winston.format.timestamp(), // 로그 시간 추가
        winston.format.errors({ stack: true }), // 에러 객체의 stack trace 포함
        winston.format.json(), // JSON 형식으로 로그 출력
    ),

    transports: [
        // 콘솔 로그 출력 (NestJS 스타일 포맷)
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                nestWinstonModuleUtilities.format.nestLike('NestJS-API', {
                    prettyPrint: true,
                }),
            ),
        }),

        // 전체 로그 (info 이상): 날짜별 회전 및 보관
        new winston.transports.DailyRotateFile({
            dirname: logDir,
            filename: 'nestjs-test-api-all-%DATE%.log', // 날짜가 들어간 로그 파일 이름
            datePattern: 'YYYY-MM-DD', // 로그 파일 이름에 적용할 날짜 형식
            zippedArchive: false, // 오래된 파일 압축 저장 여부 (false: 압축 안 함)
            maxSize: '20m', // 파일 크기 20MB 초과 시 같은 날짜로 -1, -2 이름으로 분할 저장됨 EX) 파일명-2025-07-16.log, 파일명-2025-07-16-1.log 등
            maxFiles: '14d', // 오늘 날짜 기준으로 14일이 지난 파일은 자동 삭제됨, '14'처럼 숫자만 표시하면 최근 14개 파일만 유지
            level: 'info', // info, warn, error 로그까지 포함
            auditFile: path.join(logDir, '.nestjs-test-api-info-audit.json'), // 파일 회전/삭제 관리용 메타파일
        }),

        // 에러 로그 (error만 별도로 기록)
        new winston.transports.DailyRotateFile({
            dirname: logDir,
            filename: 'nestjs-test-api-error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '30d', // 오늘 기준 30일이 지난 에러 로그 파일은 자동 삭제
            level: 'error',
            auditFile: path.join(logDir, '.nestjs-test-api-error-audit.json'),
        }),
    ],
};
