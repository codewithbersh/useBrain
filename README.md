# useBrain: Interactive Quiz Platform

**Live Website**: [https://use-brain.vercel.app/](https://use-brain.vercel.app/)

useBrain is a dynamic web application, enabling users to create and partake in quizzes. Create, manage, or play quizzes while keeping track of your progress.

## Site Map

- **/dashboard**: User's primary workspace after logging in.
  - **My Lessons**: Overview of lessons curated by the user. Each lesson provides options to Play, Manage, or Delete.
  - **My History**: A historical account of user activity. Each history item leads to quiz replay or quiz details.
- **/lesson**: Creation hub for a new lesson.
- **/lesson?id=lesson-id**: View or modify a lesson based on ownership and privacy settings.
- **/explore**: A gallery of PUBLIC quizzes, available for everyone to play.
- **/settings**: Customize your public display name or decide to delete your account.
- **/play?id=lesson-id**: Engage in a quiz. Post-game analytics include total points, accuracy, percentile rank, and more.

## Technologies Used

### Backend:

- **Framework**: Django coupled with Django Rest Framework for a resilient API construction.
- **Deployment**: Backend is hosted on [render.com](https://render.com).
- **Authentication**: Features Django's built-in authentication reinforced with `dj_rest_auth`, `simplejwt`, and `allauth`.
- **Database**: POSTGRESQL database managed through [render.com](https://render.com).

### Frontend:

- **Framework**: Developed with TypeScript-powered React using the NextJS framework (`13.4`).
- **Authentication**: Frontend authentication via NextAuth, integrating Google Provider and Credentials Provider.
- **Form Management**: Reliable form validations through React-Hook-Forms, ZOD, and TypeScript.
- **HTTP Client**: Axios ensures efficient HTTP requests.
- **State Management**: Incorporating TanStack Query and ZUSTAND.
- **Data Representation**: TanStack Tables headless UI for structuring data grids.

### Design & UI:

- **CSS Framework**: Tailwind CSS for a sleek user interface.
- **UI Components**: ShadCN UI built on top of RADIX UI and Tailwind CSS.
- **Icons**: Elegantly designed using Lucide-React.
- **Illustrations**: Illustrations using [Popsy](https://popsy.co/illustrations).
- **Design Prototyping**: Check out our high-fidelity and low-fidelity designs on [Figma](https://www.figma.com/file/SQUrxbvpoqw3QU4yY7okS3/useBrain?type=design&node-id=0%3A1&mode=design&t=Cgv2d29Q9Wxi2jkY-1).
