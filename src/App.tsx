import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Sidebar } from "./widgets/layout/ui/Sidebar/Sidebar";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import EditIcon from "@mui/icons-material/Edit";


function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    localStorage.setItem('token', 'my-test-token');
  }, []);

  return (
    <>

      <h1>{t('astrostilist')}</h1>

      <button onClick={() => i18n.changeLanguage('ru')}>RU</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Sidebar
      companyName='АСтростилист'
      user={{
        name: "Ирина С.",
        avatar: "",
      }}
      items={[
        {label: "Главная", icon: <HomeIcon />},
        {label: "Каталог", icon: <ViewListIcon /> },
        {label: "Редактор", icon: <EditIcon />, selected: true },
      ]}/>
      </div>
    </>
  );
}

export default App;