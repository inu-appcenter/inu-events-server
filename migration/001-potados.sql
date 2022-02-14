-- 001.potados.sql

-- user 테이블에 알림 준비를 위한 칼럼 세개 추가
ALTER TABLE inu_events.`user` ADD fcm_token varchar(255) NULL COMMENT 'FCM 토큰.';
ALTER TABLE inu_events.`user` CHANGE fcm_token fcm_token varchar(255) NULL COMMENT 'FCM 토큰.' AFTER remember_me_token;
ALTER TABLE inu_events.`user` ADD subscribing TINYINT NOT NULL COMMENT '전체 알림 수신 여부.';
ALTER TABLE inu_events.`user` CHANGE subscribing subscribing TINYINT NOT NULL COMMENT '전체 알림 수신 여부.' AFTER fcm_token;
ALTER TABLE inu_events.`user` ADD subscribing_on varchar(255) NULL COMMENT '전체 알림 키워드 필터(쉼표로 구분).';
ALTER TABLE inu_events.`user` CHANGE subscribing_on subscribing_on varchar(255) NULL COMMENT '전체 알림 키워드 필터(쉼표로 구분).' AFTER subscribing;
