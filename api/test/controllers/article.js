import { expect, request } from 'chai';
import api from '../../src/server';
import { loadFixture } from '../../src/utils/test';
import Article from '../../src/models/article';
import { withLogin } from '../utils';


describe('Article controller', () => {
	let article;

  let authUser = {
    email: 'valid@email.com',
    password: 'valid_password'
  };

	before(async () => {
		await loadFixture('example');
		await loadFixture('articles');
		article = await Article.findOne({});
		expect(article).to.not.be.null;
		expect(article.rss).to.not.be.null;
	});

	describe('get', () => {
		it('should return the right article via /articles/:articleId', async () => {
			let response = await withLogin(
				api,
				request(api).get(`/articles/${article.id}`),
				authUser
			);
			expect(response).to.have.status(200);
		});
	});

	describe('get parsed article', () => {
		it('should return the parsed version of the article', async () => {
			let response = await withLogin(
				api,
				request(api).get(`/articles/${article.id}?type=parsed`),
				authUser
			);
			expect(response).to.have.status(200);
		});
	});

	describe('list', () => {
		it('should return the list of articles', async () => {
			let response = await withLogin(
				api,
				request(api).get('/articles'),
				authUser
			);
			expect(response).to.have.status(200);
		});
	});

});
