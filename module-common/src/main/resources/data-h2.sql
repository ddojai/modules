insert into posts (title, content, created_date, modified_date) values ('테스트1', '테스트1의 본문', now(), now());
insert into posts (title, content, created_date, modified_date) values ('테스트2', '테스트2의 본문', now(), now());

insert into posts_tags (posts_id, tags) values (1, '태그1');
insert into posts_tags (posts_id, tags) values (2, '태그2');
