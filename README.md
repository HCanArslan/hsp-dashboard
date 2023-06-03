This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```
hsp-case
├─ .eslintrc.json
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     └─ heads
│  │        └─ master
│  ├─ objects
│  │  ├─ 02
│  │  │  └─ 1681f4dd1493e0d110ff856b660f69ab2dc72d
│  │  ├─ 14
│  │  │  └─ f2678f14fedfa3dc08322f682a03909fdbe637
│  │  ├─ 33
│  │  │  └─ ad091d26d8a9dc95ebdf616e217d985ec215b8
│  │  ├─ 51
│  │  │  └─ 74b28c565c285e3e312ec5178be64fbeca8398
│  │  ├─ 54
│  │  │  └─ e8bf3e2a29015a45e11cdc279e06b459890d8b
│  │  ├─ 65
│  │  │  └─ 142fc3c224bf60c463674cfba76d10669e8aae
│  │  ├─ 71
│  │  │  └─ 8d6fea4835ec2d246af9800eddb7ffb276240c
│  │  ├─ 77
│  │  │  └─ 52948ba1113c742461603f1b17475260d7bd4e
│  │  ├─ 8b
│  │  │  └─ 8e58111e46dc1d3d7b4eb357cd74aedc4ecb0f
│  │  ├─ 8c
│  │  │  └─ 4d1b21f11f2a8909c644a8a818e99597963450
│  │  ├─ 8f
│  │  │  ├─ 322f0d8f49570a594b865ef8916c428a01afc1
│  │  │  └─ 7ef26779ec7091ee05c1e2cc0f3bb0bb419ada
│  │  ├─ 90
│  │  │  └─ 689f295aadd499c1648e6d9149e30ad59770d6
│  │  ├─ 96
│  │  │  └─ 5a1228cf6c9add1218e0adef73bb6ee230fe7f
│  │  ├─ a2
│  │  │  └─ 0fce963dadc592ec7b1bd32abe595ac7569a2a
│  │  ├─ a8
│  │  │  └─ 43cbee09afaadbf9c8dd1477dcccf7eb56af50
│  │  ├─ b9
│  │  │  └─ 3763f021d24f025e0c540a68d767b69c729dbb
│  │  ├─ bf
│  │  │  └─ fb357a7122523ec94045523758c4b825b448ef
│  │  ├─ d2
│  │  │  └─ f84222734f27b623d1c80dda3561b04d1284af
│  │  ├─ d3
│  │  │  └─ 758baab351def0bf9e7abd8317fc9298b0808c
│  │  ├─ e2
│  │  │  └─ c3f6236a2b2b59553ca126f5b5e85b5ef0b169
│  │  ├─ f8
│  │  │  └─ bcc7e5caed177cb9ecfa7c02bc9a854b8ad1ff
│  │  ├─ fd
│  │  │  └─ 81e885836d815b8019694a910a93d86a43cb66
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ master
│     └─ tags
├─ .gitignore
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ pages
│  ├─ api
│  │  └─ api.ts
│  ├─ components
│  │  ├─ Card.tsx
│  │  ├─ DashboardContent.tsx
│  │  ├─ Header.tsx
│  │  ├─ Sidebar.tsx
│  │  └─ Table.tsx
│  ├─ Dashboard.tsx
│  ├─ index.tsx
│  ├─ _app.tsx
│  └─ _document.tsx
├─ postcss.config.js
├─ public
│  ├─ favicon.ico
│  ├─ next.svg
│  └─ vercel.svg
├─ README.md
├─ styles
│  └─ globals.css
├─ tailwind.config.js
├─ tsconfig.json
└─ yarn.lock

```