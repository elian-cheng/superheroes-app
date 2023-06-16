import { rest } from 'msw';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import { IHero } from 'store/heroSlice';
import { BASE_URL } from 'API/URL';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

export const heroesList = {
  results: [
    {
      _id: '64888d84ba63be03735b680e',
      nickname: 'Superman',
      real_name: 'Clark Kent',
      origin_description:
        "He was born Kal-El on the planet Krypton, before being rocketed to\nEarth as an infant by his scientist father Jor-El, moments before Krypton's destruction",
      superpowers:
        'solar energy absorption and healing factor, solar flare and heat vision,\nsolar invulnerability, flight',
      catch_phrase:
        "“Look, up in the sky, it's a bird, it's a plane, it's Superman!",
      images: [
        'https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg',
        'https://helios-i.mashable.com/imagery/articles/007gM13nImpaUkbO7aDR5LA/hero-image.fill.size_1200x1200.v1666637470.jpg',
      ],
    },
    {
      _id: '64888d84ba63be03735b680f',
      nickname: 'Batman',
      real_name: 'Bruce Wayne',
      origin_description:
        'After witnessing the murder of his parents as a child, Bruce Wayne vowed to rid Gotham City of crime.',
      superpowers:
        'Genius-level intellect, peak physical and mental conditioning, detective skills, martial arts mastery, advanced technology gadgets',
      catch_phrase: "I'm Batman!",
      images: [
        'https://upload.wikimedia.org/wikipedia/en/1/17/Batman-BenAffleck.jpg',
        'https://www.dccomics.com/sites/default/files/imce/2016/09-SEP/BM_Cv12_57d5ce41d7d030.95178404.jpg',
      ],
    },
  ],
};

export const heroModal: IHero = {
  _id: '64888d84ba63be03735b680e',
  nickname: 'Superman',
  real_name: 'Clark Kent',
  origin_description:
    "He was born Kal-El on the planet Krypton, before being rocketed to\nEarth as an infant by his scientist father Jor-El, moments before Krypton's destruction",
  superpowers:
    'solar energy absorption and healing factor, solar flare and heat vision,\nsolar invulnerability, flight',
  catch_phrase:
    "“Look, up in the sky, it's a bird, it's a plane, it's Superman!",
  images: [
    'https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg',
    'https://helios-i.mashable.com/imagery/articles/007gM13nImpaUkbO7aDR5LA/hero-image.fill.size_1200x1200.v1666637470.jpg',
  ],
};

export const handlers = [
  rest.get(`${BASE_URL}heroes?page=1?limit=5`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(heroesList));
  }),

  rest.get(`${BASE_URL}heroes/:id`, (req, res, ctx) => {
    const { id } = req.params;
    if (id === '101') {
      return res(ctx.status(200), ctx.json(heroModal));
    }
  }),
];
