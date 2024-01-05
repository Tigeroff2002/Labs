namespace Zoo;

class LIMB
{
    public LIMB(int a, int b)
    {
        if (temp[0] == 0)
            temp[0] = 1;

            VandF[0] = a;
            VandF[1] = b;

            memcompl();
        }

        public float[,] vert;
        public int[,] face;
        public float[,] t_vert;
        public int[,] t_face;

        private int MaterialNom = -1;

        public int[] VandF = new int[4];
        private int[] temp = new int[2];

        private bool ModelHasTexture = false;

        public bool NeedTexture()
        {
            return ModelHasTexture;
        }

        public void SetMaterialNom(int new_nom)
        {
            MaterialNom = new_nom;
            if (MaterialNom > -1)
                ModelHasTexture = true;
        }

        public void createTextureVertexMem(int a)
        {
            VandF[2] = a;
            t_vert = new float[3, VandF[2]];
        }

        public void createTextureFaceMem(int b)
        {
            VandF[3] = b;
            t_face = new int[3, VandF[3]];

        }

        private void memcompl()
        {
            vert = new float[3, VandF[0]];
            face = new int[3, VandF[1]];
        }

        public int GetTextureNom()
        {
            return MaterialNom;
        }
    }