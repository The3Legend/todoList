const tasks = [{
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: false,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: true,
    body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: true,
    body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function (arrOfTasks) {
  const arrOfObj = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task
    return acc

  }, {})
  //element
  const ulbut = document.querySelector('.list-group')
  const form = document.forms['addTask']
  const titleForm = form.elements['title']
  const bodyForm = form.elements['body']
  const ul = document.querySelector('.tasks-list-section .list-group', )
  //Кнопки
  const fragmentBut = document.createDocumentFragment()
  const div = document.createElement('div')
  const allTask = document.createElement('button')
  allTask.textContent = 'показать все задачи'
  allTask.style.margin = '10px'
  const stopTask = document.createElement('button')
  stopTask.textContent = 'показать незавершенные задачи'
  div.appendChild(allTask);
  div.appendChild(stopTask)
  fragmentBut.appendChild(div)
  ulbut.insertAdjacentElement('beforebegin', allTask)
  ulbut.insertAdjacentElement('beforebegin', stopTask)


  stopTask.addEventListener('click', e => {
    const fragm = document.createDocumentFragment()
    for (let i = ul.children.length - 1; i > -1; i--) {
      if (ul.children[i].classList.contains('border-success')) {
        fragm.appendChild(ul.children[i])
        console.log('hi')
      }

    }
    fragmCount.appendChild(fragm)
  })

  const fragmCount = document.createDocumentFragment()

  allTask.addEventListener('click', e => {
    ul.appendChild(fragmCount)
  })






  //Закінчення

  form.addEventListener('submit', createForm)
  createTask(arrOfObj)





  function createTask(task) {
    if (!task) {
      alert('передайте значення!')
      return
    }

    const fragment = document.createDocumentFragment();
    Object.values(task).forEach(element => {
      const li = createElemtnt(element)
      fragment.appendChild(li)



    });
    ul.appendChild(fragment)
  }

  function createElemtnt({
    _id,
    body,
    title,
    completed
  }) {
    const div = document.createElement('div')

    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2', )
    li.setAttribute('data-task-id', _id)

    const span = document.createElement('span')
    span.textContent = title
    span.style.fontWeight = 'bold'
    const btn = document.createElement('button')
    btn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn', )
    btn.textContent = 'Delete button'
    const par = document.createElement('p');
    par.classList.add('mt-2', 'w-100', )
    par.textContent = body
    const compl = document.createElement('button');
    compl.textContent = 'Задача виконана'
    compl.classList.add('green')

    li.appendChild(span);
    li.appendChild(btn);
    li.appendChild(par);
    li.appendChild(compl)

    return li;
  }

  function createForm(e) {
    e.preventDefault();
    const titleValue = titleForm.value;
    const bodyValue = bodyForm.value;
    if (!titleValue || !bodyValue) {
      alert('уведіть дані')
      return;
    }
    const task = createNewTask(titleValue, bodyValue);
    const saveTask = createElemtnt(task)
    ul.insertAdjacentElement('afterbegin', saveTask)
    form.reset();

  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: Math.random()

    }
    arrOfObj[newTask._id] = newTask
    return {
      ...newTask
    }
  }




  //видалиння task
  ul.addEventListener('click', deleteBtn);

  function deleteBtn({
    target
  }) {
    const parent = target.closest('[data-task-id')
    if (target.classList.contains('delete-btn')) {
      const isConfirm = confirm('Ви впевнені що бажаєте видалити дану задачу?');
      isConfirm ? deletEl(parent) : false

    }

  }

  function deletEl(el) {
    el.remove();
  }

  ul.addEventListener('click', complFun);

  function complFun(e) {
    if (e.target.classList.contains('green')) {
      e.target.classList.toggle('btn-success')
      e.target.closest('.list-group-item').classList.toggle('border-success')

    }

  }

})(tasks);