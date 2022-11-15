 const getMenuFrontEnd=(role = 'USER_ROLE')=>{
  const  menu  = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      subMenu: [
        { title: 'Main',        routerLink: '/',},
        { title: 'Progressbar', routerLink: './progress'},
        { title: 'Promises',    routerLink: './promises'},
        { title: 'RXJS',        routerLink: './rxjs'},

      ],
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      subMenu: [
        // { title: 'Usuarios',   routerLink: './usuarios'},
        { title: 'Hospitales', routerLink: './hospitales'},
        { title: 'Medicos',    routerLink: './medicos'},
      ],
    },
  ];

  if(role === 'ADMIN_ROLE'){
    menu[1].subMenu.unshift({ title: 'Usuarios',   routerLink: './usuarios'});
  }

  return menu;
}

module.exports ={
    getMenuFrontEnd
}