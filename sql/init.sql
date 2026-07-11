-- ============================================================
-- 数据库初始化脚本
-- 项目: json-server (NestJS + TypeORM + MySQL)
-- 说明: 仅支持第三方登录，不存储 password
-- ============================================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS `json_server`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `json_server`;

-- ============================================================
-- 1. 用户表 (user)
-- ============================================================
-- 设计说明:
--   - 不存储 password，仅支持第三方登录 (GitHub 等)
--   - id 使用 VARCHAR，由 nanoid 生成（与代码逻辑一致）
--   - github_id 用于 GitHub OAuth 登录关联
--   - 埋点字段: last_login_time, last_login_ip, last_login_address, login_count
-- ============================================================
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`
(
    `id`                VARCHAR(20)                       NOT NULL COMMENT '用户ID (nanoid生成)',
    `username`          VARCHAR(50)                       NOT NULL DEFAULT '' COMMENT '用户名',
    `email`             VARCHAR(100)                      NOT NULL DEFAULT '-' COMMENT '邮箱',
    `avatar`            VARCHAR(500)                      NOT NULL DEFAULT '' COMMENT '头像URL',
    `role`              TINYINT                           NOT NULL DEFAULT 0 COMMENT '角色: 0-普通用户 1-管理员',
    `status`            TINYINT                           NOT NULL DEFAULT 0 COMMENT '状态: 0-正常 1-禁用',
    -- 第三方登录字段
    `github_id`         VARCHAR(50)                       NOT NULL DEFAULT '' COMMENT 'GitHub用户ID',
    -- IP 埋点字段
    `ip`                VARCHAR(50)                       NOT NULL DEFAULT '-' COMMENT '最近登录IP',
    `ip_address`        VARCHAR(100)                      NOT NULL DEFAULT '-' COMMENT '最近登录地区',
    -- 登录埋点字段
    `last_login_time`   TIMESTAMP                         NULL DEFAULT NULL COMMENT '最后登录时间',
    `last_login_ip`     VARCHAR(50)                       NOT NULL DEFAULT '-' COMMENT '最后登录IP',
    `last_login_address` VARCHAR(100)                     NOT NULL DEFAULT '-' COMMENT '最后登录地区',
    `login_count`       INT UNSIGNED                      NOT NULL DEFAULT 0 COMMENT '累计登录次数',
    -- 通用埋点字段
    `create_time`       TIMESTAMP                         NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time`       TIMESTAMP                         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    -- 主键与索引
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_github_id` (`github_id`),
    KEY `idx_email` (`email`),
    KEY `idx_create_time` (`create_time`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='用户表 - 仅支持第三方登录';

-- ============================================================
-- 2. 文章表 (article)
-- ============================================================
-- 设计说明:
--   - id 使用 INT 自增（与代码逻辑一致）
--   - tag_ids 存储标签ID的JSON数组字符串，如 "[1,2,3]"
--   - author_id 关联用户表，记录文章作者
--   - 埋点字段: views, like_count, comment_count, share_count
-- ============================================================
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`
(
    `id`             INT AUTO_INCREMENT PRIMARY KEY COMMENT '文章ID',
    `title`          VARCHAR(200)                     NOT NULL DEFAULT '' COMMENT '标题',
    `description`    VARCHAR(500)                     NOT NULL DEFAULT '' COMMENT '摘要描述',
    `content`        LONGTEXT                         NOT NULL COMMENT '正文内容 (Markdown)',
    `tag_ids`        VARCHAR(255)                     NOT NULL DEFAULT '[]' COMMENT '标签ID JSON数组, 如 [1,2,3]',
    -- 作者关联
    `author_id`      VARCHAR(20)                      NOT NULL DEFAULT '' COMMENT '作者用户ID (关联user.id)',
    -- 状态字段
    `is_top`         TINYINT                          NOT NULL DEFAULT 0 COMMENT '是否置顶: 0-否 1-是',
    `status`         TINYINT                          NOT NULL DEFAULT 0 COMMENT '状态: 0-草稿 1-已发布 2-下架',
    `is_deleted`     TINYINT                          NOT NULL DEFAULT 0 COMMENT '软删除: 0-正常 1-已删除',
    -- 埋点字段 (统计类)
    `views`          INT UNSIGNED                     NOT NULL DEFAULT 0 COMMENT '浏览量',
    `like_count`     INT UNSIGNED                     NOT NULL DEFAULT 0 COMMENT '点赞数',
    `comment_count`  INT UNSIGNED                     NOT NULL DEFAULT 0 COMMENT '评论数',
    `share_count`    INT UNSIGNED                     NOT NULL DEFAULT 0 COMMENT '分享数',
    -- 通用埋点字段
    `create_time`    TIMESTAMP                        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time`    TIMESTAMP                        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    -- 索引
    KEY `idx_author_id` (`author_id`),
    KEY `idx_status` (`status`),
    KEY `idx_is_top` (`is_top`),
    KEY `idx_create_time` (`create_time`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='文章表';

-- ============================================================
-- 3. 标签表 (tag)
-- ============================================================
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`
(
    `id`           INT AUTO_INCREMENT PRIMARY KEY COMMENT '标签ID',
    `tag_name`     VARCHAR(50)                    NOT NULL DEFAULT '' COMMENT '标签名称',
    `status`       TINYINT                        NOT NULL DEFAULT 0 COMMENT '状态: 0-正常 1-禁用',
    `create_time`  TIMESTAMP                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time`  TIMESTAMP                      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY `uk_tag_name` (`tag_name`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='标签表';

-- ============================================================
-- 4. 邮箱验证码表 (email_code)
-- ============================================================
-- 说明: 若后续仍需邮箱验证码功能（如绑定/换绑邮箱）可保留此表
-- ============================================================
DROP TABLE IF EXISTS `email_code`;
CREATE TABLE `email_code`
(
    `id`          INT AUTO_INCREMENT PRIMARY KEY COMMENT '自增ID',
    `email`       VARCHAR(100)                   NOT NULL COMMENT '邮箱地址',
    `code`        VARCHAR(10)                    NOT NULL COMMENT '验证码',
    `send_time`   TIMESTAMP                      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发送时间',
    KEY `idx_email` (`email`),
    KEY `idx_send_time` (`send_time`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT ='邮箱验证码表';

-- ============================================================
-- 初始化标签数据 (可选)
-- ============================================================
INSERT INTO `tag` (`tag_name`)
VALUES ('前端'),
       ('后端'),
       ('数据库'),
       ('DevOps'),
       ('随笔');

