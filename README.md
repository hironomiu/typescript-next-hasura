# typescript-next-hasura

## SetUp

| パラメータ             | 設定値                                  |
| :--------------------- | :-------------------------------------- |
| NEXT_PUBLIC_HASURA_URL | Hasura の URL                           |
| NEXT_PUBLIC_HASURA_KEY | Hasura に設定した x-hasura-admin-secret |

`./.env.local`

```
NEXT_PUBLIC_HASURA_URL=
NEXT_PUBLIC_HASURA_KEY=
```

`./.env.test.local`

```
NEXT_PUBLIC_HASURA_URL=
NEXT_PUBLIC_HASURA_KEY=
```

## Run

```
yarn run dev
```

## Install Memo

```
yarn create next-app .
```

```
yarn add @apollo/client @apollo/react-hooks cross-fetch @heroicons/react
```

```
yarn add -D msw@0.35.0 next-page-tester jest @testing-library/react @types/jest @testing-library/jest-dom @testing-library/dom babel-jest @babel/core @testing-library/user-event jest-css-modules
```

```
touch .babelrc
```

```
{
    "presets": [
        "next/babel"
    ]
}
```

`package.json`

```
"jest": {
        "testPathIgnorePatterns": [
            "<rootDir>/.next/",
            "<rootDir>/node_modules/"
        ],
        "moduleNameMapper": {
            "\\.(css)$": "<rootDir>/node_modules/jest-css-modules"
        }
    }
```

```
"test": "jest --env=jsdom --verbose"
```

## TypeScript

[Create tsconfig.json](https://nextjs.org/learn/excel/typescript/create-tsconfig)

```
touch tsconfig.json
yarn add -D typescript @types/react @types/node
```

`yarn dev`で起動し`tsconfig.json`に反映

```
yarn dev
```

## Rename

`./pages/_app.js` -> `./pages/_app.tsx`,`./pages/index.js` -> `./pages/index.tsx`

`_app.tsx`

```
import '../styles/globals.css'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
```

`index.tsx`

```
const Home = () => {
  return <div>index</div>
}

export default Home
```

## Tailwind

[Install Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs)

```
yarn add tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

`tailwind.config.js`

```
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

`./styles/globals.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## GraphQL codegen

[Installation](https://www.graphql-code-generator.com/docs/getting-started/installation)

※ npm では次の init でエラーとなるため yarn を選択した（全体含め yarn を使う理由）

```
yarn add graphql
yarn add -D @graphql-codegen/cli
```

```
yarn graphql-codegen init
```

`? What type of application are you building? ` -> `Application built with React`を選択

`Where is your schema?:` -> 作成した HASURA API の`GraphQL Endpoint`を指定

`? Where are your operations and fragments?:` -> `queries/**/*.ts`を指定

`? Pick plugins: (Press <space> to select, <a> to toggle all, <i> to invert selection , and <enter> to proceed)` -> そのままエンター(以下が選択されている)

```
❯◉ TypeScript (required by other typescript plugins)
 ◉ TypeScript Operations (operations and fragments)
 ◉ TypeScript React Apollo (typed components and HOCs)
 ◯ TypeScript GraphQL files modules (declarations for .graphql files)
 ◯ TypeScript GraphQL document nodes (embedded GraphQL document)
 ◯ Introspection Fragment Matcher (for Apollo Client)
 ◯ Urql Introspection (for Urql Client)
```

`? Where to write the output` -> `types/generated/graphql.tsx`を指定

`? Do you want to generate an introspection file?` -> n

`? How to name the config file?` -> `codegen.yml`を指定

`? What script in package.json should run the codegen? ` -> `gen-types`を指定

`yarn`の実行

```
yarn
```

```
yarn add -D @graphql-codegen/typescript
```

## Types generate

`queries/queries.ts`作成後実行(`@client`は一旦コメントにし、s 実行後コメントを外す)

実行後`types/generated/graphql.tsx`が作成されれば OK

```
yarn gen-types
```
