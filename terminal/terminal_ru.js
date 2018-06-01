(function() {

  var $output;
  var _inited = false;
  var _locked = false;
  var _buffer = [];
  var _obuffer = [];
  var _ibuffer = [];
  var _cwd = "/";
  var _prompt = function() { return _cwd + " $ "; };
  var _history = [];
  var _hindex = -1;
  var _lhindex = -1;

  var _filetree = {
    'projects':   {type: 'dir', files: {
		'Cryptanon': {type: 'file', mime: 'text/plain', content: "sd dgs shgf fdhg h"},
		'VKgCrawler': {type: 'file', mime: 'text/plain', content: "df gdg ddfsds "},		
    }},
    'AUTHORS': {type: 'file', mime: 'text/plain', content: "Created by SPIDER-L33T <arahnidous@gmail.com>\n\n"},
    'README' : {type: 'file', mime: 'text/plain', content: 'All my projects placed in "projects" directory'},
    
  };

  var _commands = {

    ls: function(dir) {
      dir = parsepath((dir || _cwd));

      var out = [];
      var iter = getiter(dir);

      var p;
      var tree = (iter && iter.type == 'dir') ? iter.files : _filetree;
      var count = 0;
      var total = 0;

      for ( var i in tree ) {
        if ( tree.hasOwnProperty(i) ) {
          p = tree[i];
          if ( p.type == 'dir' ) {
            out.push(format('{0} {1} {2}', padRight('<'+i+'>', 20), padRight(p.type, 20), '0'));
          } else {
            out.push(format('{0} {1} {2}', padRight(i, 20), padRight(p.mime, 20), p.content.length));
            total += p.content.length;
          }
          count++;
        }
      }

      out.push(format("\n{0} файл(а/ов), всего {1} байт", count, total));

      return out.join("\n");
    },

    cd: function(dir) {
      if ( !dir ) {
        return (["Вы должны указать аргумент: директория"]).join("\n");
      }

      var dirname = parsepath(dir);
      var iter = getiter(dirname);
      if ( dirname == '/' || (iter && iter.type == 'dir')) {
        _cwd = dirname;
        return (['Вошли в: ' + dirname]).join("\n");
      }

      return (["Путь не найден: " + dirname]).join("\n");
    },

    cat: function(file) {
      if ( !file ) {
        return (["Вы должны указать аргумент: файл"]).join("\n");
      }

      var filename = parsepath(file);
      var iter = getiter(filename);
      if ( !iter ) {
        return (["Файл не найден: " + filename]).join("\n");
      }

      return iter.content;
    },

    cwd: function() {
      return (['Текущая директория: ' + _cwd]).join("\n");
    },

    clear: function() {
      return false;
    },

    contact: function(key) {
      key = key || '';
      var out = [];

      switch ( key.toLowerCase() ) {
        case 'email' :
          window.open('mailto:arahnidous@gmail.com');
          break;
        case 'github' :
          window.open('https://github.com/SPIDER-L33T/');
          break;
        case 'linkedin' :
          window.open('https://www.linkedin.com/in/александр-горелов-3033393b');
          break;
        case 'twitter' :
          window.open('https://twitter.com/#!/spider_l33t');
          break;
        case 'google+' :
          window.open('https://profiles.google.com/101483296240627353587?rel=author');
          break;

        default :
          if ( key.length ) {
            out = ['Неверный ключ: ' + key];
          } else {
            out = [
              "Контактная информация:\n",
              'Имя:       Alex',
              'Email:     arahnidous@gmail.com',
              'Github:    https://github.com/SPIDER-L33T/',
              'LinkedIn:  https://www.linkedin.com/in/александр-горелов-3033393b',                         
              'Twitter:   https://twitter.com/#!/spider_l33t',
              'Google+:   https://profiles.google.com/101483296240627353587?rel=author'
            ];
          }
          break;
      }

      return out.join("\n");
    },
	
	get: function(key) {
		key = key || '';
		var out = [];
	  
		switch ( key.toLowerCase() ) {
        case 'kms' :
          window.open('https://mega.nz/#!Ad8VwYRI!EpvfXtywjftXnF-_UG1FUpGjI038k88FbhXc-KQm2C0');
          break;
		case 'antivirus' :
          window.open('https://mega.nz/#F!NJk0FJJA!jLEa1uJBXU7yNiDHaD2IBA');
          break
		  
		default :
          if ( key.length ) {
            out = ['Invalid key: ' + key];
          } else {
            out = [
              "Доступные файлы:\n",
              'kms:       KMS активатор',
              'antivirus: ESET антифирус'
            ];
          }
          break;
		}
		
		return out.join("\n");
	},
	
	about: function(){
		var out = [
		'My name is Alexander.',
		'С 2001 по 2006 основатель и учредитель интернет провайдера "Online Telecom". На данный момент работаю начальником отдела ИТ в компании "РОСТА".',
		];
		return out.join("\n");
	},
	
	facts: function(){
		var out = [
		'- Вне работы я security-аудитор, web-разработчик и инструктор по стрельбе.',
		'- В качестве хобби, разработал свою систему домашней автоматизации и систему защищенной передачи данных по открытым линиям связи (Internet).',
		'- Работаю над созданием отказоустойчивой peer-to-peer сети.',
        '- Мне нравится искать уязвимости в неизвестных компьютерных сетях ("взлом из чёрного ящика").',
        '- I`m interecting cluster/cloud computing, hashcracking and Android-software developing.',
        '- Я интересуюсь кластерными/облачными вычислениями, хэшкрекингом и разработкой приложений для платформы Android.',
        '- Мне нравятся компьютерные игры и я не считаю это зазорным. В играх предпочитаю стратегии и шутеры от первого лица.',
        '- С закрытыми глазами могу разобрать/собрать автомат Калашникова.',
		'- Нравится отдых на природе и запах жженого пороха.',
		];
		return out.join("\n");
	},
	
	qualities: function(){
		var out = [
		'-Executive',
		'-Responsibility',
		'-Serious',
		'-Fair',
		'-Strict',
		];
		return out.join("\n");
	},
	
    help: function() {
      var out = [
        '\n\n',
        'help                                         Эта команда',
		'---------------',
		'about .......................................Обо мне',
		'facts ........................................Некоторые факты обомне',
		'qualities ...................................Мои качества',
		'---------------',
        'contact .....................................Как связаться',
        'contact <key> ..........................Открыть контакт (например: `email` или `google+`)',
        'clear .........................................Очистить экран',
        'ls ..............................................Список содержимого текущей директории',
        'cd <dir> ....................................Войти в директорию',
        'cat <filename> .........................Показать содержимое файла',        
		'get <filename> .........................Получить файл из сети',
        ''
      ];

      return out.join("\n");
    }

  };

  /////////////////////////////////////////////////////////////////
  // UTILS
  /////////////////////////////////////////////////////////////////

  function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', selectionEnd);
      range.moveStart('character', selectionStart);
      range.select();
    }
  }

  function format(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    var sprintfRegex = /\{(\d+)\}/g;

    var sprintf = function (match, number) {
      return number in args ? args[number] : match;
    };

    return format.replace(sprintfRegex, sprintf);
  }


  function padRight(str, l, c) {
    return str+Array(l-str.length+1).join(c||" ")
  }

  function padCenter(str, width, padding) {
    var _repeat = function(s, num) {
      for( var i = 0, buf = ""; i < num; i++ ) buf += s;
      return buf;
    };

    padding = (padding || ' ').substr( 0, 1 );
    if ( str.length < width ) {
      var len     = width - str.length;
      var remain  = ( len % 2 == 0 ) ? "" : padding;
      var pads    = _repeat(padding, parseInt(len / 2));
      return pads + str + pads + remain;
    }

    return str;
  }

  function parsepath(p) {
    var dir = (p.match(/^\//) ? p : (_cwd  + '/' + p)).replace(/\/+/g, '/');
    return realpath(dir) || '/';
  }

  function getiter(path) {
    var parts = (path.replace(/^\//, '') || '/').split("/");
    var iter = null;

    var last = _filetree;
    while ( parts.length ) {
      var i = parts.shift();
      if ( !last[i] ) break;

      if ( !parts.length ) {
        iter = last[i];
      } else {
        last = last[i].type == 'dir' ? last[i].files : {};
      }
    }

    return iter;
  }

  function realpath(path) {
    var parts = path.split(/\//);
    var path = [];
    for ( var i in parts ) {
      if ( parts.hasOwnProperty(i) ) {
        if ( parts[i] == '.' ) {
          continue;
        }

        if ( parts[i] == '..' ) {
          if ( path.length ) {
            path.pop();
          }
        } else {
          path.push(parts[i]);
        }
      }
    }

    return path.join('/');
  }

  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  /////////////////////////////////////////////////////////////////
  // SHELL
  /////////////////////////////////////////////////////////////////

  (function animloop(){
    requestAnimFrame(animloop);

    if ( _obuffer.length ) {
      $output.value += _obuffer.shift();
      _locked = true;

      update();
    } else {
      if ( _ibuffer.length ) {
        $output.value += _ibuffer.shift();

        update();
      }

      _locked = false;
      _inited = true;
    }
  })();

  function print(input, lp) {
    update();
    _obuffer = _obuffer.concat(lp ? [input] : input.split(''));
  }

  function update() {
    $output.focus();
    var l = $output.value.length;
    setSelectionRange($output, l, l);
    $output.scrollTop = $output.scrollHeight;
  }

  function clear() {
    $output.value = '';
    _ibuffer = [];
    _obuffer = [];
    print("");
  }

  function command(cmd) {
    print("\n");
    if ( cmd.length ) {
      var a = cmd.split(' ');
      var c = a.shift();
      if ( c in _commands ) {
        var result = _commands[c].apply(_commands, a);
        if ( result === false ) {
          clear();
        } else {
          print(result || "\n", true);
        }
      } else {
        print("Неизвестная команда: " + c);
      }

      _history.push(cmd);
    }
    print("\n\n" + _prompt());

    _hindex = -1;
  }

  function nextHistory() {
    if ( !_history.length ) return;

    var insert;
    if ( _hindex == -1 ) {
      _hindex  = _history.length - 1;
      _lhindex = -1;
      insert   = _history[_hindex];
    } else {
      if ( _hindex > 1 ) {
        _lhindex = _hindex;
        _hindex--;
        insert = _history[_hindex];
      }
    }

    if ( insert ) {
      if ( _lhindex != -1 ) {
        var txt = _history[_lhindex];
        $output.value = $output.value.substr(0, $output.value.length - txt.length);
        update();
      }
      _buffer = insert.split('');
      _ibuffer = insert.split('');
    }
  }

  window.onload = function() {
    $output = document.getElementById("output");
    $output.contentEditable = true;
    $output.spellcheck = false;
    $output.value = '';

    $output.onkeydown = function(ev) {
      var k = ev.which || ev.keyCode;
      var cancel = false;

      if ( !_inited ) {
        cancel = true;
      } else {
        if ( k == 9 ) {
          cancel = true;
        } else if ( k == 38 ) {
          nextHistory();
          cancel = true;
        } else if ( k == 40 ) {
          cancel = true;
        } else if ( k == 37 || k == 39 ) {
          cancel = true;
        }
      }

      if ( cancel ) {
        ev.preventDefault();
        ev.stopPropagation();
        return false;
      }

      if ( k == 8 ) {
        if ( _buffer.length ) {
          _buffer.pop();
        } else {
          ev.preventDefault();
          return false;
        }
      }

      return true;
    };

    $output.onkeypress = function(ev) {
      ev.preventDefault();
	  var randkeysound = Math.floor(Math.random() * (11 - 1) + 1);
	  //console.log(randkeysound);
	  if(ev.keyCode == 13){
		  document.getElementById('audiotagenter').play();
	  }
	  else {
		  document.getElementById('audiotag'+randkeysound).play();
	  }
      if ( !_inited ) {
        return false;
      }

      var k = ev.which || ev.keyCode;
      if ( k == 13 ) {
        var cmd = _buffer.join('').replace(/\s+/, ' ');
        _buffer = [];
        command(cmd);
      } else {
        if ( !_locked ) {
          var kc = String.fromCharCode(k);
          _buffer.push(kc);
          _ibuffer.push(kc);
        }
      }

      return true;
    };

    $output.onfocus = function() {
      update();
    };

    $output.onblur = function() {
      update();
    };

    window.onfocus = function() {
      update();
    };
	document.getElementById('audiotagon').play();
	print("Загрузка ядра ....................................................\n");
    print("Инициализация SPIDER-L33T оболочки вер.1.0 ....................................................\n");	
    print("Copyright (c) 2018 SPIDER-L33T <arahnidous@gmail.com>\n\n", true);	
print("███████╗██████╗░██╗██████╗░███████╗██████╗░░░░░░░██╗░░░░░██████╗░██████╗░████████╗\n", true);
print("██╔════╝██╔══██╗██║██╔══██╗██╔════╝██╔══██╗░░░░░░██║░░░░░╚════██╗╚════██╗╚══██╔══╝\n", true);
print("███████╗██████╔╝██║██║░░██║█████╗░░██████╔╝█████╗██║░░░░░░█████╔╝░█████╔╝░░░██║░░░\n", true);
print("╚════██║██╔═══╝░██║██║░░██║██╔══╝░░██╔══██╗╚════╝██║░░░░░░╚═══██╗░╚═══██╗░░░██║░░░\n", true);
print("███████║██║░░░░░██║██████╔╝███████╗██║░░██║░░░░░░███████╗██████╔╝██████╔╝░░░██║░░░\n", true);
print("╚══════╝╚═╝░░░░░╚═╝╚═════╝░╚══════╝╚═╝░░╚═╝░░░░░░╚══════╝╚═════╝░╚═════╝░░░░╚═╝░░░\n", true);
    print("\n\n\n", true);
    print(padCenter("Терминал в старом стиле\n", 113), true);
    print("\n\n\n\n\n", true);
    print("Введите 'help' для получения списка доступных команд.\n", true);
    print("\n\n" + _prompt());
  };
})();
