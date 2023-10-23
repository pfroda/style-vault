# StyleVault

A mobile web app transforming your closet into a digital experience. Engineered an intuitive platform allowing users to seamlessly upload items, automatically populated by Cloud Vision AI, organize collections, create stylish outfits, and share fashion insights.

<!-- <img src="https://i.imgur.com/6rgGIwI.png" alt="Home" width="190" height="412">&nbsp;&nbsp; -->
<img src="https://i.imgur.com/7lUTCMb.png" alt="Closets" width="190" height="412">&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://i.imgur.com/tWRD1ij.png" alt="All outfits" width="190" height="412">&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://i.imgur.com/IeBCU1k.png" alt="Upload item" width="190" height="412">&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://i.imgur.com/PcOXyrs.png" alt="Upload outfit" width="190" height="412">
<br>
<!-- <img src="https://i.imgur.com/KnSysTd.png" alt="All clothes" width="190" height="412">&nbsp;&nbsp; -->
<img src="https://i.imgur.com/z1pzPPF.png" alt="Unique item" width="190" height="412">&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://i.imgur.com/khS2n5j.png" alt="Filters" width="190" height="412">&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://i.imgur.com/NhHy0xS.png" alt="Social" width="190" height="412">&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://i.imgur.com/t73xKQL.png" alt="Social search" width="190" height="412">


## Getting started:
1. Clone the repo:

   ```bash
      git clone https://github.com/pfroda/style-vault
      cd style-vault
    ```
2. Obtain Cloudinary API Key and API Secret:

   - After creating your account, navigate to Settings (bottom left corner).
   - You will find the Cloudinary Name (bottom left corner) under Product Environment.
   - Click on the "Access Keys" section to find your API Key and API Secret.
3. Set .env in server folder:
   ```env
      DB_NAME=your DB name
      DB_USER=your DB user (usually postgres)
      DB_PASSWORD=your postgres password
      DB_HOST=your host
      DB_DIALECT=postgres
      DB_PORT=your port (usually 5432)
      CORS_ORIGIN=your origin URL

      GOOGLE_APPLICATION_CREDENTIALS=your json file
      CLOUDINARY_CLOUD_NAME=your Cloudinary name
      CLOUDINARY_API_KEY=your Cloudinary API key
      CLOUDINARY_API_SECRET=your Cloudinary API secret
   ```
4. Set .env.local in client folder:

   ```env
      NEXT_PUBLIC_BASE_URL=your server URL
   ```
5. Install the dependencies and run the server:

   ```bash
      cd server && npm install
      npm run start:dev
    ```
6. Install the dependencies and run the client:

   ```bash
      cd client && npm install
      npm run dev
    ```

## Tech stack:

StyleVault uses:
- [Next.js](https://nextjs.org/) as the frontend framework, based in [React.js](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [TypeScript](https://www.typescriptlang.org/) language
- Vanilla [CSS](https://www.css3.com/) for styling
- [Express](https://expressjs.com/) and [Apollo](https://www.apollographql.com/docs/apollo-server/) for the backend server
- [PostgreSQL](https://www.postgresql.org/) as the database
- [Sequelize](https://sequelize.org/) as the ORM
- [GraphQL](https://graphql.org/) for the API
- [VisionIA](https://cloud.google.com/vision?hl=es) for autofill of image fields

## Authors:

Xavier Fàbrega: [GitHub](https://github.com/xavierfapa/) - [Linkedin](https://www.linkedin.com/in/xavierfabregapascual/)<br>
Diego García: [GitHub](https://github.com/diegogarciaruiz) - [Linkedin](https://www.linkedin.com/in/diego-garcia-ruiz-villareal/)<br>
Natalia Genie: [GitHub](https://github.com/nataliagenie) - [Linkedin](https://www.linkedin.com/in/nataliagenie/)<br>
Pau Fàbrega: [GitHub](https://github.com/pfroda/) - [Linkedin](https://www.linkedin.com/in/paufabregaroda/)
