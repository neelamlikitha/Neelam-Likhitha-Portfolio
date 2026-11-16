# Project Deployment Checklists

These checklists are based on the project descriptions in the portfolio and the
public repository files that were available to inspect. The current workspace
contains the portfolio website, not the seven project source trees. Do not treat
the recommendations below as confirmation that a project is deployment-ready.

No hosting URLs have been invented. No project deployment configuration has
been added because entry points, full dependencies, environment variables, and
runtime behavior need to be verified in each project's source first.

## 1. Digital Governance & Justice

- **Repository:** [Digital-Solutions-For-Good-Governance-And-justice](https://github.com/neelamlikitha/Digital-Solutions-For-Good-Governance-And-justice)
- **Evidence found:** Repository root contains a ZIP archive and README, not an inspectable application tree.
- **Stack stated in README:** HTML, CSS, JavaScript, Flask/Python, MongoDB.
- **Recommended hosting:** Render web service for Flask, with MongoDB Atlas for the database. Keep templates and static assets served by Flask unless the source proves the frontend is independently buildable.
- [ ] Extract the ZIP and verify the project structure, Flask module, and application object.
- [ ] Confirm templates/static paths, case-sensitive filenames, and all local asset references.
- [ ] Create/pin `requirements.txt`; include a production WSGI server.
- [ ] Identify required settings and move secrets/database credentials into environment variables (for example `SECRET_KEY` and `MONGODB_URI`).
- [ ] Check database initialization, seed/admin setup, session security, file uploads, and persistent storage needs.
- [ ] Add deployment configuration only after identifying the actual WSGI target. A production command will generally be `gunicorn <module>:<app_object>`; those names are not confirmed yet.
- [ ] Deploy and test registration/login, case filing, status tracking, admin routes, static assets, and database connectivity.

## 2. Waste Food Management

- **Repository:** [Street-Food---Hub-](https://github.com/neelamlikitha/Street-Food---Hub-)
- **Evidence found:** Repository root contains a ZIP archive, screenshots, and README; application source files were not individually available.
- **Stack stated in README:** HTML, CSS, JavaScript, Bootstrap, Flask/Python, MongoDB.
- **Recommended hosting:** Render web service for Flask and MongoDB Atlas for MongoDB.
- [ ] Extract the ZIP and verify app entry point, templates, static assets, and route behavior.
- [ ] Create/pin `requirements.txt` from actual imports and include a production WSGI server.
- [ ] Identify environment variables, including `SECRET_KEY` and MongoDB connection URI; do not commit credentials.
- [ ] Verify image/static paths and whether uploads or generated files need durable object storage.
- [ ] Check role-based login, donor submission, admin dashboard, and MongoDB operations with production settings.
- [ ] Add a `Procfile` or Render configuration using the verified WSGI target; do not guess the module/object name.
- [ ] Deploy and test the full donation workflow, permissions, and mobile layouts.

## 3. Student Management System

- **Repository:** [IIT-student-management](https://github.com/neelamlikitha/IIT-student-management)
- **Evidence found:** Repository has a Python script and README. The README describes a command-line program using JSON storage; the inspected script prints records and has sample data in memory. This differs from the portfolio detail page's description of a web application.
- **Stack confirmed:** Python; no web framework or HTML/CSS/JavaScript interface confirmed.
- **Recommended hosting:** No web host is appropriate for the current CLI program. To make a browser-based Live Demo, first build a web UI. Streamlit Community Cloud is a low-friction option if the project is adapted to Streamlit; a Flask app could instead run on Render.
- [ ] Decide whether the public demo should remain a CLI (not a browser Live Demo) or be converted into a web app.
- [ ] Reconcile the current source behavior with the portfolio's web-app description without claiming features that are not in the source.
- [ ] For a Streamlit conversion, separate data/business logic from terminal output and replace local JSON writes with a safe demo persistence strategy.
- [ ] For a Flask conversion, define routes, templates, validation, and persistence before selecting a production command.
- [ ] Add dependencies and hosting configuration only after selecting and implementing the web framework.
- [ ] Test record creation, viewing, updates, persistence, and input validation in the deployed demo.

## 4. Facial Emotion Recognition

- **Repository:** [Facial-Emotion-Recognition](https://github.com/neelamlikitha/Facial-Emotion-Recognition)
- **Evidence found:** `emotion.py`, Haar cascade XML, `requirements.txt`, README, and an output image. The script opens the machine's webcam and uses OpenCV/DeepFace.
- **Stack confirmed:** Python, OpenCV, DeepFace, TensorFlow/Keras runtime dependencies.
- **Recommended hosting:** Hugging Face Spaces with a Gradio interface after adaptation to image/video upload. A browser webcam demo would require explicit browser camera capture and a server/API design; the current server-side webcam loop cannot use a visitor's camera.
- [ ] Replace or redesign `cv2.VideoCapture(0)` for a hosted interface; do not expect a cloud server to have the user's webcam.
- [ ] Create a web UI for image/video inputs, with clear consent and privacy messaging for face analysis.
- [ ] Pin and test compatible Python, TensorFlow, `tf-keras`, DeepFace, and OpenCV versions; current requirements are unpinned.
- [ ] Ensure the Haar cascade path works in the hosted filesystem or use OpenCV's packaged cascade path consistently.
- [ ] Check model download size, cold-start time, memory, CPU/GPU availability, and hosting limits.
- [ ] Use headless OpenCV if no desktop display is needed; remove `imshow`/`waitKey` from the web request flow.
- [ ] Deploy only after testing representative uploads and handling invalid/no-face inputs.

## 5. Moving Object Detection

- **Repository:** [Moving-Object-Detection-opencv](https://github.com/neelamlikitha/Moving-Object-Detection-opencv)
- **Evidence found:** Repository has `src/main.py`, `src/motion_detector.py`, an output directory, README, and an empty `requirements.txt`. README describes webcam capture through OpenCV.
- **Stack confirmed:** Python and OpenCV; no web framework or browser UI confirmed.
- **Recommended hosting:** Hugging Face Spaces with Gradio for uploaded videos after adaptation. The existing webcam/desktop application cannot be deployed unchanged as a visitor-facing web demo.
- [ ] Decide whether to support uploaded videos or implement browser camera capture plus a backend stream API.
- [ ] Refactor camera capture and desktop display (`VideoCapture`, `imshow`, `waitKey`) out of a server request path.
- [ ] Populate and pin `requirements.txt` based on actual imports; use headless OpenCV for a server without a display.
- [ ] Confirm output files are not assumed to persist on an ephemeral host; provide a download response if the demo produces a video.
- [ ] Test file-size/duration limits, processing time, memory, cleanup, and concurrent requests.
- [ ] Deploy and validate with sample videos before publishing a Live Demo URL.

## 6. Sentiment Analysis

- **Repository:** [IIT-sentiment-analysis](https://github.com/neelamlikitha/IIT-sentiment-analysis)
- **Evidence found:** Repository has a Python script and README, but no inspectable `requirements.txt`, saved model, or web application in the root. The script downloads NLTK data, trains/evaluates a model, and prints a sample prediction.
- **Stack stated/used:** Python, NLTK, scikit-learn, NumPy, Matplotlib, and Seaborn.
- **Recommended hosting:** Hugging Face Spaces with Gradio or Streamlit Community Cloud after adding an interactive text input. A browser interface is not present in the current script.
- [ ] Separate interactive inference from training/evaluation; avoid retraining the model on every web app startup or request.
- [ ] Decide whether to ship a model artifact or train/cache it during a controlled build; verify model licensing and reproducibility.
- [ ] Pin dependencies and arrange NLTK corpora/lexicon availability without relying on an unverified runtime download.
- [ ] Add a UI for text input, empty/long-input validation, and positive/negative/neutral output.
- [ ] Remove or make optional plotting code not needed for inference.
- [ ] Test cold starts, resource use, and predictions on unseen text before publishing.

## 7. Certificate Management & Generation Platform (CMGP)

- **Source evidence:** The portfolio detail page lists the stack and features, but its GitHub button is a `#` placeholder. No source repository or application folder was available to inspect.
- **Stack stated on portfolio page:** React, Node.js, Express, PostgreSQL, Tailwind CSS, Redux Toolkit, JWT, Cloudinary, and Docker.
- **Recommended hosting:** Render for the Express API and managed PostgreSQL, with the React frontend on Render Static Sites or Vercel. Cloudinary can remain the media store if configured with server-side secrets.
- [ ] Provide the source repository and confirm the React/Express folder structure, package scripts, lockfiles, and Docker setup.
- [ ] Identify the API entry point, frontend build command/output directory, and any local development proxy.
- [ ] Configure production API base URL, CORS allowlist, JWT secret, database URL, and Cloudinary credentials as host environment variables.
- [ ] Verify schema migrations, production database initialization, TLS, token expiry, upload limits, and authorization checks.
- [ ] Ensure certificates/PDFs and user uploads are not written to ephemeral local disk.
- [ ] Add frontend and backend deployment configs only after confirming actual scripts and paths.
- [ ] Test registration, authorization, generation, bulk XLSX validation, PDF download, Cloudinary assets, and public verification after deployment.

## Information needed before preparing deployable configuration

1. The source ZIPs extracted into accessible project folders for Digital Governance and Waste Food Management.
2. The intended web-demo scope for Student Management, Facial Emotion Recognition, Moving Object Detection, and Sentiment Analysis.
3. The CMGP source repository or project folder.
4. Confirmation of a preferred host if you want to standardize platforms; otherwise use the per-project recommendations above.

Once deployed, add each actual public URL to the matching Live Demo link in `projects.html`. Keep the current links unchanged until a real URL is available.
