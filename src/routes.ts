import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUserReceivedComplimentsController } from './controllers/ListUserReceivedComplimentsController';
import { ListUserSentComplimentsController } from './controllers/ListUserSentComplimentsController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

router.post('/signup', new CreateUserController().handle);
router.post(
  '/tags/create',
  ensureAuthenticated,
  ensureAdmin,
  new CreateTagController().handle
);
router.post('/login', new AuthenticateUserController().handle);
router.post(
  '/compliments/create',
  ensureAuthenticated,
  new CreateComplimentController().handle
);

router.get(
  '/users/compliments/sent',
  ensureAuthenticated,
  new ListUserSentComplimentsController().handle
);
router.get(
  '/users/compliments/received',
  ensureAuthenticated,
  new ListUserReceivedComplimentsController().handle
);

router.get('/tags', ensureAuthenticated, new ListTagsController().handle);

export { router };
