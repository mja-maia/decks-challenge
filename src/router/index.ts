import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import NewDeck from '../views/NewDeck.vue';
import OrderedPile from '../views/OrderedPile.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/deck/new',
  },
  {
    path: '/deck',
    redirect: '/deck/new',
  },
  {
    path: '/deck/new',
    name: 'NewDeck',
    component: NewDeck,
  },
  {
    path: '/deck/:deckId',
    name: 'OrderedPile',
    component: OrderedPile,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
