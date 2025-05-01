# Deploying Rhythm Game Backend on Glitch

This project can be deployed on Glitch, a free platform for hosting Node.js apps.

## Steps to deploy

1. Create a new project on Glitch (https://glitch.com/).
2. Import this repository or upload the project files.
3. Ensure `package.json` and `server.js` are present.
4. Set environment variables in the `.env` file or Glitch's environment settings:
   - `JWT_SECRET=your_jwt_secret_key_here`
5. Glitch automatically runs `npm start` based on `package.json`.
6. Your app will be live at `https://your-project-name.glitch.me`.

## Notes

- Update frontend API URLs to point to your Glitch app URL.
- Glitch projects sleep after inactivity; consider upgrading if needed.
- For persistent storage, consider external databases or APIs.

This setup allows easy deployment and quick iteration for your backend.
