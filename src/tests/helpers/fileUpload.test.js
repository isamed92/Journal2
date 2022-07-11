import { fileUpload } from '../../helpers/fileUpload';

describe('pruebas en fileUpload', () => {
  test('debe de subir el archivo correctamente a cloudinary', async () => {
    const imageURL =
      'https://pm1.narvii.com/6117/a2382c44999fc64cc0c6a292a64370ef6485ef86_hq.jpg';

    const resp = await fetch(imageURL);
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');
  });
});
