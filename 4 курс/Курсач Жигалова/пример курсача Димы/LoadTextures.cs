    class LoadTextures
    {
        private string texture_name = "";
        private int imageId = 0;
        private uint mGlTextureObject = 0;
        Dictionary<string, string> sheeps = new Dictionary<string, string>
        {
            {"dima", "texture\\dima.jpg"},
            {"vlad", "texture\\vlad.jpg"},
            {"alisa", "texture\\alisa.jpg"},
            {"gray", "texture\\gray.jpg"},
            {"gray1", "texture\\gray1.jpg"},
            {"gray2", "texture\\gray2.jpg"},
            {"white", "texture\\white.jpg"},
            {"background", "texture\\background.jpg"},
            {"aquarium", "texture\\aquarium.jpg"},
            {"petuh", "texture\\petuh.jpg"},
            {"red", "texture\\red.jpg"},
            {"orange", "texture\\orange.jpg"},
        };

        public uint GetTextureObj()
        {
            return mGlTextureObject;
        }

        public void LoadTextureForModel(string FileName)
        {
            texture_name = FileName;
            Il.ilGenImages(1, out imageId);
            Il.ilBindImage(imageId);
            string fileName = "";

            foreach (KeyValuePair<string, string> sheep in sheeps)
            {
                if (texture_name.Contains(sheep.Key)) fileName = sheep.Value;
            }

            Il.ilDisable(Il.IL_ORIGIN_SET);
            Il.ilEnable(Il.IL_CONV_PAL);

            string url = Path.GetFullPath(fileName);

            if (Il.ilLoadImage(url))
            {
                int width = Il.ilGetInteger(Il.IL_IMAGE_WIDTH);
                int height = Il.ilGetInteger(Il.IL_IMAGE_HEIGHT);

                int bitspp = Il.ilGetInteger(Il.IL_IMAGE_BITS_PER_PIXEL);

                switch (bitspp)
                {
                    case 24:
                        mGlTextureObject = MakeGlTexture(Gl.GL_RGB, Il.ilGetData(), width, height);
                        break;
                    case 32:
                        mGlTextureObject = MakeGlTexture(Gl.GL_RGBA, Il.ilGetData(), width, height);
                        break;
                }

                Il.ilDeleteImages(1, ref imageId);
            }
        }

        private static uint MakeGlTexture(int Format, IntPtr pixels, int w, int h)
        {
            uint texObject;

            Gl.glGenTextures(1, out texObject);
            Gl.glPixelStorei(Gl.GL_UNPACK_ALIGNMENT, 1);
            Gl.glBindTexture(Gl.GL_TEXTURE_2D, texObject);

            Gl.glTexParameteri(Gl.GL_TEXTURE_2D, Gl.GL_TEXTURE_WRAP_S, Gl.GL_REPEAT);
            Gl.glTexParameteri(Gl.GL_TEXTURE_2D, Gl.GL_TEXTURE_WRAP_T, Gl.GL_REPEAT);
            Gl.glTexParameteri(Gl.GL_TEXTURE_2D, Gl.GL_TEXTURE_MAG_FILTER, Gl.GL_LINEAR);
            Gl.glTexParameteri(Gl.GL_TEXTURE_2D, Gl.GL_TEXTURE_MIN_FILTER, Gl.GL_LINEAR);
            Gl.glTexEnvf(Gl.GL_TEXTURE_ENV, Gl.GL_TEXTURE_ENV_MODE, Gl.GL_REPLACE);

            switch (Format)
            {
                case Gl.GL_RGB:
                    Gl.glTexImage2D(Gl.GL_TEXTURE_2D, 0, Gl.GL_RGB, w, h, 0, Gl.GL_RGB, Gl.GL_UNSIGNED_BYTE, pixels);
                    break;

                case Gl.GL_RGBA:
                    Gl.glTexImage2D(Gl.GL_TEXTURE_2D, 0, Gl.GL_RGBA, w, h, 0, Gl.GL_RGBA, Gl.GL_UNSIGNED_BYTE, pixels);
                    break;
            }
            return texObject;
        }
    }