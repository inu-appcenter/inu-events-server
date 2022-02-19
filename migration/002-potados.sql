-- 002-potados.sql

-- 프사 필드 추가
ALTER TABLE inu_events.`user` ADD image_uuid varchar(255) NULL COMMENT '사용자 프로필 사진 UUID.';
ALTER TABLE inu_events.`user` CHANGE image_uuid image_uuid varchar(255) NULL COMMENT '사용자 프로필 사진 UUID.' AFTER nickname;
