import React, { useState, useEffect, useRef } from 'react';
import Heading from './Heading';
import { help, socialHandles } from './Commands';

const App = () => {
  const password = 'pinakipb2';
  const [text, setText] = useState('');
  const [allCommands, setallCommands] = useState([]);
  const [commands, setCommands] = useState([
    // {
    //   command: 'abc',
    //   output: "Command not found. For a list of commands, type 'help'.",
    // },
  ]);
  const [currentCommandNumber, setCurrentCommandNumber] = useState(0);
  const focusInput = useRef();

  const goToEndRef = useRef(null);
  const scrollToBottom = () => {
    goToEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [text, commands]);

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const checkCurrentCommand = (currentCommand) => {
    const command = currentCommand.trim();
    setallCommands([...allCommands, command]);
    setCurrentCommandNumber((currentCommandNumber) => currentCommandNumber + 1);
    switch (command) {
      case 'clear':
        setCommands([]);
        break;
      case 'help':
        help.sort((a, b) => a.command.localeCompare(b.command));
        const htmlForHelp = help.map((h) => `<div class="flex justify-between w-1/3"><span> ${h.command}</span><span class="text-amber-400">${h.work}</span></div>`);
        setCommands([...commands, { command, output: htmlForHelp.join('') }]);
        break;
      case 'whois':
        setCommands([...commands, { command, output: 'This Site is Created by <span class="text-amber-400">Pinaki Bhattacharjee</span>' }]);
        break;
      case 'whoami':
        setCommands([...commands, { command, output: 'The paradox of “Who am I?” is: we never know, but, we constantly find out.' }]);
        break;
      case 'secret':
        setCommands([...commands, { command, output: 'Check console for Password.' }]);
        console.log('%cYou hacked my password!😠', 'color: #04ff00; font-weight: bold; font-size: 20px;');
        console.log("%cPassword: '" + password + "' - I wonder what it does?🤔", 'color: grey');
        console.log('%cHaha NOOB!🤣', 'color: #04ff00; font-weight: bold; font-size: 24px;');
        break;
      case 'projects':
        setCommands([
          ...commands,
          { command, output: 'Opening Github : <a href="https://github.com/pinakipb2/" target="_blank" rel="noopener noreferrer" class="text-amber-400">https://github.com/pinakipb2/</a>' },
        ]);
        openInNewTab('https://github.com/pinakipb2/');
        break;
      case 'history':
        const htmlForHistory = allCommands.map((comm) => `<div class="flex justify-between w-1/3"><span class="text-amber-400">${comm}</span></div>`);
        setCommands([...commands, { command, output: htmlForHistory.join('') }]);
        break;
      case 'social':
        socialHandles.sort((a, b) => a.platform.localeCompare(b.command));
        const htmlForSocial = socialHandles.map(
          (handles) =>
            `<div class="flex justify-between w-1/3"><span> ${handles.platform}</span><a class="text-amber-400" href=${handles.url + handles.handle} target="_blank" rel="noopener noreferrer">${
              handles.platform + '/' + handles.handle
            }</a></div>`
        );
        setCommands([...commands, { command, output: htmlForSocial.join('') }]);
        break;
      case 'email':
        setCommands([...commands, { command, output: `You can reach me @ 📧 <a class="text-amber-400" href="mailto:pinakipb2@gmail.com">'pinakipb2@gmail.com'</a>.` }]);
        break;
      case 'password':
        setCommands([...commands, { command, output: `Lol! You're joking, right? You're gonna have to try harder than that! 😂` }]);
        break;
      case 'sudo':
        setCommands([...commands, { command, output: `You are not an Admin ! 🔒` }]);
        break;
      case 'exit':
        setCommands([...commands, { command, output: `Thank you for using <span class="text-amber-400">TERMUNIL</span>. Hope to see you soon ! 👋` }]);
        setTimeout(() => {
          openInNewTab('https:/github.com/pinakipb2');
        }, 4000);
        break;
      case 'ls':
        const contents = ['index.html', 'package.json', 'postcss.config.js', 'screenshot', 'tailwind.config.js', 'node_modules', 'package-lock.json', 'README.md', 'src', 'vite.config.js'];
        const htmlForLs = contents.map((content) => `<div>${content}</div>`);
        htmlForLs.splice(0, 0, '<div class="grid grid-cols-5 gap-4 w-3/4 gap-y-0.5">');
        htmlForLs.push('</div>');
        setCommands([...commands, { command, output: htmlForLs.join('') }]);
        break;
      default:
        setCommands([...commands, { command, output: `Command not found. For a list of commands, type <span class="text-amber-400">'help'</span>.` }]);
        break;
    }
  };
  return (
    <>
      <Heading />
      <div className="flex flex-col mt-6 text-lg font-medium space-x-2 w-full pr-2 mb-4">
        {commands.map((command, index) => (
          <div className="ml-2" key={index}>
            <div className="flex">
              <div>visitor@{`${import.meta.env.VITE_BASE_URL}`}:~$ </div>
              <div className="ml-2 w-full text-green-400">{command.command}</div>
            </div>
            <div className="text-orange-500 ml-2 mt-2 mb-2" dangerouslySetInnerHTML={{ __html: command.output }}></div>
          </div>
        ))}
        <div className="flex ml-2">
          <div>visitor@{`${import.meta.env.VITE_BASE_URL}`}:~$ </div>
          <div className="ml-2 w-full">
            <input
              autoComplete="false"
              ref={focusInput}
              type="text"
              className="w-full focus:outline-none caret-lime-500 bg-background text-green-400"
              value={text}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const currentCommand = e.target.value.toLowerCase();
                  checkCurrentCommand(currentCommand);
                  setText('');
                } else if (e.key === 'ArrowUp') {
                  // TODO : Go to previous command from allCommands
                  const prevCommand = currentCommandNumber - 1;
                  setText(allCommands[prevCommand]);
                  e.currentTarget.setSelectionRange(allCommands[prevCommand].length, allCommands[prevCommand].length);
                  if (prevCommand > 0) setCurrentCommandNumber((currentCommandNumber) => currentCommandNumber - 1);
                } else if (e.key === 'ArrowDown') {
                  // TODO : Go to next command from allCommands
                  const nextCommand = currentCommandNumber - 1;
                  setText(allCommands[nextCommand]);
                  if (nextCommand < allCommands.length - 1) setCurrentCommandNumber((currentCommandNumber) => currentCommandNumber + 1);
                }
              }}
              onChange={(e) => {
                setText(e.target.value.toLowerCase());
              }}
              onBlur={() => focusInput.current.focus()}
            />
          </div>
        </div>
      </div>
      <div ref={goToEndRef} />
    </>
  );
};

export default App;
