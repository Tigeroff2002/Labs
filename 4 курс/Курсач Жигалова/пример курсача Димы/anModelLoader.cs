using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tao.DevIl;
using Tao.OpenGl;

namespace Zoo
{
    class anModelLoader
    {
        public string FName = "";
        private bool isLoad = false;
        private int count_limbs;
        private int mat_nom = 0;
        private int thisList = 0;
        private int GlobalStringFrom = 0;

        LIMB[] limbs = null;

        LoadTextures[] text_objects = null;

        Model_Prop coord = new Model_Prop();

        public void SetMinimum(float x, float y, float z)
        {
            coord.minimum[0] = x;
            coord.minimum[1] = y;
            coord.minimum[2] = z;
        }
        public void SetMaximum(float x, float y, float z)
        {
            coord.maximum[0] = x;
            coord.maximum[1] = y;
            coord.maximum[2] = z;
        }
        public void SetAbsCoords(float x, float y, float z)
        {
            coord.pos_abs[0] = x;
            coord.pos_abs[1] = y;
            coord.pos_abs[2] = z;
        }

        public int RotateModel(int os, float target, float step)
        {
            if ((coord.rotating_angles[os] - target) > 0)
            {

                coord.rotating_angles[os] -= step;

                if (coord.rotating_angles[os] < target)
                {
                    coord.rotating_angles[os] = target;
                    return -1;
                }

            }
            else
            {

                coord.rotating_angles[os] += step;

                if (coord.rotating_angles[os] > target)
                {
                    coord.rotating_angles[os] = target;
                    return -1;
                }

            }

            return 0;
        }

        public int MoveModel(int os, float target, float step)
        {

            if (step == 0)
                return -1;

            float real_target = target;

            if ((coord.pos_abs[os] - real_target) > 0)
            {
                if (coord.pos_abs[os] - step >= coord.minimum[os])
                {
                    coord.pos_abs[os] -= step;

                    if (coord.pos_abs[os] < real_target)
                    {
                        coord.pos_abs[os] = real_target;
                        return -1;
                    }

                    return 0;
                }
                else
                {
                    coord.pos_abs[os] = coord.minimum[os];
                    return -1;
                }

            }
            if ((coord.pos_abs[os] - real_target) < 0)
            {
                if (coord.pos_abs[os] + step <= coord.maximum[os])
                {
                    coord.pos_abs[os] += step;
                    if (coord.pos_abs[os] > real_target)
                    {
                        coord.pos_abs[os] = real_target;
                        return -1;
                    }
                    return 0;
                }
                else
                {
                    coord.pos_abs[os] = coord.maximum[os];
                    return -1;
                }
            }
            if ((coord.pos_abs[os] - real_target) == 0)
                return -1;

            return 0;

        }

        public int LoadModel(string FileName)
        {
            limbs = new LIMB[256];
            int limb_ = -1;

            FName = FileName;

            StreamReader sw = File.OpenText(FileName);

            string a_buff = "";
            string b_buff = "";
            string c_buff = "";

            int ver = 0, fac = 0;

            while ((a_buff = sw.ReadLine()) != null)
            {
                b_buff = GetFirstWord(a_buff, 0);
                if (b_buff[0] == '*')
                {
                    switch (b_buff)
                    {
                        case "*MATERIAL_COUNT":
                            {
                                c_buff = GetFirstWord(a_buff, GlobalStringFrom);
                                int mat = System.Convert.ToInt32(c_buff);

                                text_objects = new LoadTextures[mat];
                                continue;
                            }

                        case "*MATERIAL_REF":
                            {
                                c_buff = GetFirstWord(a_buff, GlobalStringFrom);
                                int mat_ref = System.Convert.ToInt32(c_buff);

                                limbs[limb_].SetMaterialNom(mat_ref);
                                continue;
                            }

                        case "*MATERIAL":
                            {
                                c_buff = GetFirstWord(a_buff, GlobalStringFrom);
                                mat_nom = System.Convert.ToInt32(c_buff);
                                continue;
                            }

                        case "*GEOMOBJECT":
                            {
                                limb_++;
                                continue;
                            }

                        case "*MESH_NUMVERTEX":
                            {
                                c_buff = GetFirstWord(a_buff, GlobalStringFrom);
                                ver = System.Convert.ToInt32(c_buff);
                                continue;
                            }

                        case "*BITMAP":
                            {
                                c_buff = "";

                                for (int ax = GlobalStringFrom + 2; ax < a_buff.Length - 1; ax++)
                                    c_buff += a_buff[ax];

                                text_objects[mat_nom] = new LoadTextures();

                                text_objects[mat_nom].LoadTextureForModel(c_buff);

                                continue;
                            }

                        case "*MESH_NUMTVERTEX":
                            {
                                c_buff = GetFirstWord(a_buff, GlobalStringFrom);
                                if (limbs[limb_] != null)
                                {
                                    limbs[limb_].createTextureVertexMem(System.Convert.ToInt32(c_buff));
                                }
                                continue;
                            }

                        case "*MESH_NUMTVFACES":
                            {
                                c_buff = GetFirstWord(a_buff, GlobalStringFrom);

                                if (limbs[limb_] != null)
                                {
                                    limbs[limb_].createTextureFaceMem(System.Convert.ToInt32(c_buff));
                                }
                                continue;
                            }

                        case "*MESH_NUMFACES":
                            {
                                c_buff = GetFirstWord(a_buff, GlobalStringFrom);
                                fac = System.Convert.ToInt32(c_buff);

                                if (limb_ > -1 && ver > -1 && fac > -1)
                                {
                                    limbs[limb_] = new LIMB(ver, fac);
                                }
                                else
                                {
                                    return -1;
                                }
                                continue;
                            }

                        case "*MESH_VERTEX":
                            {
                                if (limb_ == -1)
                                    return -2;
                                if (limbs[limb_] == null)
                                    return -3;

                                string a1 = "", a2 = "", a3 = "", a4 = "";

                                a1 = GetFirstWord(a_buff, GlobalStringFrom);
                                a2 = GetFirstWord(a_buff, GlobalStringFrom);
                                a3 = GetFirstWord(a_buff, GlobalStringFrom);
                                a4 = GetFirstWord(a_buff, GlobalStringFrom);

                                int NomVertex = System.Convert.ToInt32(a1);

                                a2 = a2.Replace('.', ',');
                                a3 = a3.Replace('.', ',');
                                a4 = a4.Replace('.', ',');

                                limbs[limb_].vert[0, NomVertex] = (float)System.Convert.ToDouble(a2); // x
                                limbs[limb_].vert[1, NomVertex] = (float)System.Convert.ToDouble(a3); // y
                                limbs[limb_].vert[2, NomVertex] = (float)System.Convert.ToDouble(a4); // z

                                continue;

                            }

                        case "*MESH_FACE":
                            {
                                if (limb_ == -1)
                                    return -2;
                                if (limbs[limb_] == null)
                                    return -3;

                                string a1 = "", a2 = "", a3 = "", a4 = "", a5 = "", a6 = "", a7 = "";

                                a1 = GetFirstWord(a_buff, GlobalStringFrom);
                                a2 = GetFirstWord(a_buff, GlobalStringFrom);
                                a3 = GetFirstWord(a_buff, GlobalStringFrom);
                                a4 = GetFirstWord(a_buff, GlobalStringFrom);
                                a5 = GetFirstWord(a_buff, GlobalStringFrom);
                                a6 = GetFirstWord(a_buff, GlobalStringFrom);
                                a7 = GetFirstWord(a_buff, GlobalStringFrom);

                                int NomFace = System.Convert.ToInt32(a1.Replace(':', '\0'));

                                limbs[limb_].face[0, NomFace] = System.Convert.ToInt32(a3);
                                limbs[limb_].face[1, NomFace] = System.Convert.ToInt32(a5);
                                limbs[limb_].face[2, NomFace] = System.Convert.ToInt32(a7);

                                continue;

                            }

                        case "*MESH_TVERT":
                            {
                                if (limb_ == -1)
                                    return -2;
                                if (limbs[limb_] == null)
                                    return -3;

                                string a1 = "", a2 = "", a3 = "", a4 = "";

                                a1 = GetFirstWord(a_buff, GlobalStringFrom);
                                a2 = GetFirstWord(a_buff, GlobalStringFrom);
                                a3 = GetFirstWord(a_buff, GlobalStringFrom);
                                a4 = GetFirstWord(a_buff, GlobalStringFrom);

                                int NomVertex = System.Convert.ToInt32(a1);

                                a2 = a2.Replace('.', ',');
                                a3 = a3.Replace('.', ',');
                                a4 = a4.Replace('.', ',');

                                limbs[limb_].t_vert[0, NomVertex] = (float)System.Convert.ToDouble(a2);
                                limbs[limb_].t_vert[1, NomVertex] = (float)System.Convert.ToDouble(a3);
                                limbs[limb_].t_vert[2, NomVertex] = (float)System.Convert.ToDouble(a4);

                                continue;

                            }

                        case "*MESH_TFACE":
                            {
                                if (limb_ == -1)
                                    return -2;
                                if (limbs[limb_] == null)
                                    return -3;

                                string a1 = "", a2 = "", a3 = "", a4 = "";

                                a1 = GetFirstWord(a_buff, GlobalStringFrom);
                                a2 = GetFirstWord(a_buff, GlobalStringFrom);
                                a3 = GetFirstWord(a_buff, GlobalStringFrom);
                                a4 = GetFirstWord(a_buff, GlobalStringFrom);

                                int NomFace = System.Convert.ToInt32(a1);

                                limbs[limb_].t_face[0, NomFace] = System.Convert.ToInt32(a2);
                                limbs[limb_].t_face[1, NomFace] = System.Convert.ToInt32(a3);
                                limbs[limb_].t_face[2, NomFace] = System.Convert.ToInt32(a4);

                                continue;
                            }
                    }
                }
            }
            count_limbs = limb_;

            int nom_l = Gl.glGenLists(1);
            thisList = nom_l;
            Gl.glNewList(nom_l, Gl.GL_COMPILE);
            CreateList();
            Gl.glEndList();
            isLoad = true;
            return 0;
        }

        private void CreateList()
        {
            Gl.glPushMatrix();

            for (int l = 0; l <= count_limbs; l++)
            {
                if (limbs[l].NeedTexture())
                    if (text_objects[limbs[l].GetTextureNom()] != null)
                    {
                        Gl.glEnable(Gl.GL_TEXTURE_2D);

                        uint nn = text_objects[limbs[l].GetTextureNom()].GetTextureObj();

                        Gl.glBindTexture(Gl.GL_TEXTURE_2D, nn);
                    }

                Gl.glEnable(Gl.GL_NORMALIZE);

                Gl.glBegin(Gl.GL_TRIANGLES);

                for (int i = 0; i < limbs[l].VandF[1]; i++)
                {
                    float x1, x2, x3, y1, y2, y3, z1, z2, z3 = 0;

                    x1 = limbs[l].vert[0, limbs[l].face[0, i]];
                    x2 = limbs[l].vert[0, limbs[l].face[1, i]];
                    x3 = limbs[l].vert[0, limbs[l].face[2, i]];
                    y1 = limbs[l].vert[1, limbs[l].face[0, i]];
                    y2 = limbs[l].vert[1, limbs[l].face[1, i]];
                    y3 = limbs[l].vert[1, limbs[l].face[2, i]];
                    z1 = limbs[l].vert[2, limbs[l].face[0, i]];
                    z2 = limbs[l].vert[2, limbs[l].face[1, i]];
                    z3 = limbs[l].vert[2, limbs[l].face[2, i]];

                    float n1 = (y2 - y1) * (z3 - z1) - (y3 - y1) * (z2 - z1);
                    float n2 = (z2 - z1) * (x3 - x1) - (z3 - z1) * (x2 - x1);
                    float n3 = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1);

                    Gl.glNormal3f(n1, n2, n3);

                    if (limbs[l].NeedTexture() && (limbs[l].t_vert != null) && (limbs[l].t_face != null))
                    {
                        Gl.glTexCoord2f(limbs[l].t_vert[0, limbs[l].t_face[0, i]], limbs[l].t_vert[1, limbs[l].t_face[0, i]]);
                        Gl.glVertex3f(x1, y1, z1);

                        Gl.glTexCoord2f(limbs[l].t_vert[0, limbs[l].t_face[1, i]], limbs[l].t_vert[1, limbs[l].t_face[1, i]]);
                        Gl.glVertex3f(x2, y2, z2);

                        Gl.glTexCoord2f(limbs[l].t_vert[0, limbs[l].t_face[2, i]], limbs[l].t_vert[1, limbs[l].t_face[2, i]]);
                        Gl.glVertex3f(x3, y3, z3);

                    }
                    else
                    {

                        Gl.glVertex3f(x1, y1, z1);
                        Gl.glVertex3f(x2, y2, z2);
                        Gl.glVertex3f(x3, y3, z3);
                    }

                }
                Gl.glEnd();
                Gl.glDisable(Gl.GL_NORMALIZE);
                Gl.glDisable(Gl.GL_TEXTURE_2D);
            }

            Gl.glPopMatrix();
        }

        private string GetFirstWord(string word, int from)
        {
            char a = word[from];
            string res_buff = "";
            int L = word.Length;

            if (word[from] == ' ' || word[from] == '\t')
            {
                int ax = 0;
                for (ax = from; ax < L; ax++)
                {
                    a = word[ax];
                    if (a != ' ' && a != '\t')
                        break;
                }

                if (ax == L)
                    return res_buff;
                else
                    from = ax;
            }
            int bx = 0;

            for (bx = from; bx < L; bx++)
            {
                if (word[bx] == ' ' || word[bx] == '\t')
                    break;
                res_buff += word[bx];
            }

            if (bx == L)
                bx--;

            GlobalStringFrom = bx;

            return res_buff;
        }

        public void DrawModel()
        {
            if (!isLoad)
                return;

            Gl.glPushMatrix();
            Gl.glTranslated(0, -4, 0);
            Gl.glScalef(0.05f, 0.05f, 0.05f);
            Gl.glRotated(-90, 1, 0, 0);
            Gl.glCallList(thisList);
            Gl.glPopMatrix();
        }
    }
}
