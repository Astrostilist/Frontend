import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropzone } from './shared/ui/Dropzone';
import { UploadItem } from './shared/ui/UploadItem/UploadItem';

function App() {
  const { t, i18n } = useTranslation();

  const [testFile, setTestFile] = useState<File | null>(null);

  const handleAddTestFile = () => {
    const file = new File(['test content'], 'document_file_name.csv', { type: 'text/plain' });
    setTestFile(file);
  };

  const handleRemove = () => {
    setTestFile(null);
  };

  useEffect(() => {
    localStorage.setItem('token', 'my-test-token');
  }, []);

  return (
    <>
      <h1>{t('astrostilist')}</h1>

      <button onClick={() => i18n.changeLanguage('ru')}>RU</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>

      <Dropzone />

      {/* Кнопка для теста */}
      <button onClick={handleAddTestFile}>Показать пример файла</button>

      {/* Проверяем, есть ли файл, и показываем его */}
      {testFile && (
        <UploadItem file={testFile} onRemove={handleRemove} fileSize={testFile.size} />
      )}
    </>
  );
}

export default App;