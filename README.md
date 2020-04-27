# Todo List

Created by Tae Kim.

## Getting Started

To begin the application, run the following commands in terminal...
- Create a `.env` file at the root of your project and add the following environment variables:

```
REACT_APP_APP_URL=https://testing-interview-todo-xxxxxxxxxx-xx.a.run.app
```

- `yarn`
- `yarn start` 
- open browser to [localhost:3000](http://localhost:3000/)

## Developer Setup (VS Code)

Here are directions to get your development environment setup within [Visual Studio Code](https://code.visualstudio.com/).

### How to install plugins:

- `cmd + shift + p`.
- Type `"Extensions: install extensions"`.
- Search for the extension.
- Click the `**Install**` button.
- You may need to reload VS Code - `cmd + shift + p` then type `"Developer: Reload Window"`.

### We recommend the following VS Code extensions:

- [ESLint by Dirk Baumer](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Setup Auto-formatting on Save

- `cmd + shift + p`
- Type `"Preferences: Open Workspace Settings"`
- Search for `"Format on Save"`
- Check the checkmark.

## TODO's
- Loading states. This woulda required a little extra work. You will probably see a flash of "There are no lists/tasks/etc" because of this.
- Add more tests. I left some as examples, but opted to do more development given the time.
- Split up bundle by Pages (async loading). No need to make the User load your entire app.
- Style the App. It's all native HTML right now.
- "Project Structure" in README. For new developers, it's important for them to have onboarding material to ramp them up quickly and efficiently. They will appreciate it.
- Introduce [react-query](https://github.com/tannerlinsley/react-query). This will help manage server-side state and caching.
- Consider something like [Tailwind CSS](https://tailwindcss.com/) for styling. It's great for most of the styling, we can always do custom stuff with CSS Modules.