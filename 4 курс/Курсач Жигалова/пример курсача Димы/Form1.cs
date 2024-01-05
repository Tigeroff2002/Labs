using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using Tao.DevIl;
using Tao.FreeGlut;
using Tao.OpenGl;

namespace Zoo
{
    public partial class Form1 : Form
    {
        Sheeps sheeps = new Sheeps();

        Flowers grass = new Flowers();

        SheepByKeyboard sheepByKeyboard = new SheepByKeyboard();

        anModelLoader sheep = null;

        Cursor cursor = null;

        public Form1()
        {
            InitializeComponent();
            AnT.InitializeContexts();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Glut.glutInit();
            Glut.glutInitDisplayMode(Glut.GLUT_RGB | Glut.GLUT_DOUBLE);

            Il.ilInit();

            Gl.glClearColor(0, 120, 0, 1);
            Gl.glViewport(0, 0, AnT.Width, AnT.Height);
            Gl.glMatrixMode(Gl.GL_PROJECTION);
            Gl.glLoadIdentity();
            Glu.gluOrtho2D(0.0, 30.0 * (float)AnT.Width / (float)AnT.Height, 0.0, 30.0);
            Gl.glMatrixMode(Gl.GL_MODELVIEW);
            RenderTimer.Start();

            comboBox1.Enabled = false;
            xBar.Enabled = false;
            trackBar1.Enabled = false;
            button1.Enabled = false;
            Touch_btn.Enabled = false;
            comboBox1.SelectedIndex = 0;
        }

        double a = 0, b = 5, c = -20, d = -360,
            xSpinFirstFish = -20;
        double aR = 0, bR = 0, cR = -0.7;
        int os_x = 0, os_y = -1, os_z = 0;
        Explosion explosion = new Explosion(0, 0, 0, 300, 500);
        // отсчет времени
        float global_time = 0;
        int mouseMoveX;
        int mouseMoveY;

        private void RenderTimer_Tick(object sender, EventArgs e)
        {
            Gl.glClear(Gl.GL_COLOR_BUFFER_BIT | Gl.GL_DEPTH_BUFFER_BIT);

            if (!_is3dShow && !_isAquariumShow)
            {
                DrawFence();

                if (_isfractalNeeede)
                {
                    grass.DrawGrass();
                }

                if (_isSheepAlive)
                {
                    sheepByKeyboard.DrawSheep();
                }

                Gl.glLoadIdentity();

                if (sheeps.DimaPointPossition == sheeps.DimaCount - 1)
                {
                    sheeps.DimaPointPossition = 0;
                }
                if (sheeps.VladPointPossition == sheeps.VladCount - 1)
                {
                    sheeps.VladPointPossition = 0;
                }
                if (sheeps.AlisaPointPossition == sheeps.AlisaCount - 1)
                {
                    sheeps.AlisaPointPossition = 0;
                }
                if (sheeps.AnastasiaPointPossition == sheeps.AnastasiaCount - 1)
                {
                    sheeps.AnastasiaPointPossition = 0;
                }
                if (sheeps.RomanPointPossition == sheeps.RomanCount - 1)
                {
                    sheeps.RomanPointPossition = 0;
                }

                sheeps.DrawSheeps();

                AnT.Invalidate();

                sheeps.DimaPointPossition++;
                sheeps.VladPointPossition++;
                sheeps.AlisaPointPossition++;
                sheeps.AnastasiaPointPossition++;
                sheeps.RomanPointPossition++;
            } else if (_is3dShow)
            {
                Gl.glClearColor(0, 255, 0, 1);
                Gl.glLoadIdentity();

                var loadTextures = new LoadTextures();
                loadTextures.LoadTextureForModel("background");

                Gl.glEnable(Gl.GL_TEXTURE_2D);
                Gl.glBindTexture(Gl.GL_TEXTURE_2D, loadTextures.GetTextureObj());

                // сохраняем состояние матрицы
                Gl.glPushMatrix();

                Gl.glTranslated(0, 0, -55);
                Gl.glRotated(90, 0, 0, 1);

                Gl.glClear(Gl.GL_4D_COLOR_TEXTURE);
                // отрисовываем полигон
                Gl.glBegin(Gl.GL_QUADS);

                Gl.glVertex3d(25, 25, 0);
                Gl.glTexCoord2f(0, 0);
                Gl.glVertex3d(25, -25, 0);
                Gl.glTexCoord2f(0, 1);
                Gl.glVertex3d(-25, -25, 0);
                Gl.glTexCoord2f(1, 1);
                Gl.glVertex3d(-25, 25, 0);
                Gl.glTexCoord2f(1, 0);

                // завершаем отрисовку
                Gl.glEnd();

                // возвращаем матрицу
                Gl.glPopMatrix();
                Gl.glClearColor(0, 255, 0, 1);

                Gl.glTranslated(a, b, c);
                Gl.glRotated(d, os_x, os_y, os_z);

                if (d == 360) d = -360; else d++;

                if (_isTouchable)
                {
                    // отсчитываем время
                    global_time += (float)RenderTimer.Interval / 1000;
                    // выполняем просчет взрыва
                    explosion.Calculate(global_time);

                    //cursor?.DrawCursor(AnT, mouseMoveX, mouseMoveY);
                }

                if (sheep != null)
                    sheep.DrawModel();

                Gl.glFlush();
                // отключаем режим текстурирования
                Gl.glDisable(Gl.GL_TEXTURE_2D);
            }
            else if (_isAquariumShow)
            {
                DrawAquarium();
            }


            AnT.Invalidate();
        }

        private void DrawAquarium()
        {
            Gl.glClearColor(0, 255, 0, 1);
            Gl.glLoadIdentity();

            var loadTextures = new LoadTextures();
            loadTextures.LoadTextureForModel("aquarium");

            Gl.glEnable(Gl.GL_TEXTURE_2D);
            Gl.glBindTexture(Gl.GL_TEXTURE_2D, loadTextures.GetTextureObj());
            // сохраняем состояние матрицы
            Gl.glPushMatrix();

            Gl.glTranslated(0, 0, -55);
            Gl.glRotated(90, 0, 0, 1);

            Gl.glClear(Gl.GL_4D_COLOR_TEXTURE);
            // отрисовываем полигон
            Gl.glBegin(Gl.GL_QUADS);

            Gl.glVertex3d(25, 25, 0);
            Gl.glTexCoord2f(0, 0);
            Gl.glVertex3d(25, -25, 0);
            Gl.glTexCoord2f(0, 1);
            Gl.glVertex3d(-25, -25, 0);
            Gl.glTexCoord2f(1, 1);
            Gl.glVertex3d(-25, 25, 0);
            Gl.glTexCoord2f(1, 0);

            // завершаем отрисовку
            Gl.glEnd();
            // возвращаем матрицу
            Gl.glPopMatrix();
            Gl.glFlush();
            // отключаем режим текстурирования
            Gl.glDisable(Gl.GL_TEXTURE_2D);

            Gl.glTranslated(xSpinFirstFish, b, c);
            if (xSpinFirstFish > 25) xSpinFirstFish = -25; else xSpinFirstFish += 0.3;

            Gl.glPushMatrix();
            Gl.glEnable(Gl.GL_COLOR_MATERIAL);
            Gl.glColor3f(1.0f, 1.0f, 0.0f);
            // Первая рыба
            Gl.glRotated(90, 0, 1, 0);
            Glut.glutSolidCone(2, 5, 10, 10);
            Glut.glutSolidSphere(3, 30, 30);
            Gl.glTranslated(0, 0, -5);
            Glut.glutSolidCone(3, 5, 10, 10);

            Gl.glTranslated(0, 0, 5);
            // Вторая рыба
            Gl.glScalef(0.5f, 0.5f, 0.5f);
            Gl.glColor3f(1.0f, 0.0f, 0.0f);
            Gl.glTranslated(0, -10, 0);
            Gl.glRotated(270, 0, 1, 0);
            Gl.glRotated(90, 0, 1, 0);
            Glut.glutSolidCone(2, 5, 10, 10);
            Glut.glutSolidSphere(3, 30, 30);
            Gl.glRotated(0, 1, 0, 0);
            Gl.glTranslated(0, 0, -5);
            Glut.glutSolidCone(3, 5, 10, 10);

            Gl.glScalef(2f, 2f, 2f);
            Gl.glTranslated(0, 0, 5);
            // Третья рыба
            Gl.glScalef(0.6f, 0.6f, 0.6f);
            Gl.glColor3f(1.0f, 0.0f, 1.0f);
            Gl.glTranslated(0, -6, 0);
            Gl.glRotated(270, 0, 1, 0);
            Gl.glRotated(90, 0, 1, 0);
            Glut.glutSolidCone(2, 5, 10, 10);
            Glut.glutSolidSphere(3, 30, 30);
            Gl.glRotated(0, 1, 0, 0);
            Gl.glTranslated(0, 0, -5);
            Glut.glutSolidCone(3, 5, 10, 10);

            Gl.glScalef(2f, 2f, 2f);
            Gl.glTranslated(0, 0, 5);
            // Четвертая рыба
            Gl.glScalef(0.8f, 0.8f, 0.8f);
            Gl.glColor3f(1.0f, 1.0f, 1.0f);
            Gl.glTranslated(0, -5, 0);
            Gl.glRotated(270, 0, 1, 0);
            Gl.glRotated(90, 0, 1, 0);
            Glut.glutSolidCone(2, 5, 10, 10);
            Glut.glutSolidSphere(3, 30, 30);
            Gl.glRotated(0, 1, 0, 0);
            Gl.glTranslated(0, 0, -5);
            Glut.glutSolidCone(3, 5, 10, 10);
            Gl.glPopMatrix();
        }

        private void DrawFence()
        {
            Gl.glColor3f(255, 255, 0);
            Gl.glLineWidth(25);
            Gl.glBegin(Gl.GL_LINES);
            Gl.glVertex2d(-15, -15);
            Gl.glVertex2d(15, -15);
            Gl.glVertex2d(15, -15);
            Gl.glVertex2d(15, 15);
            Gl.glVertex2d(15, 15);
            Gl.glVertex2d(-15, 15);
            Gl.glVertex2d(-15, 15);
            Gl.glVertex2d(-15, -15);
            Gl.glEnd();
        }

        private void trackBar1_Scroll(object sender, EventArgs e)
        {
            c = trackBar1.Value;
        }

        private void xBar_Scroll(object sender, EventArgs e)
        {
            a = xBar.Value;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            a = 0; c = -20;
            trackBar1.Value = (int)c;
            xBar.Value = (int)a;
        }

        private bool _isTouchable = false;

        private void Touch_btn_Click(object sender, EventArgs e)
        {
            if (cursor is null)
            {
                cursor = new Cursor();
            }

            _isTouchable = !_isTouchable;

            if (_isTouchable)
            {
                Touch_btn.BackColor = Color.LightGreen;
            }
            else
            {
                Touch_btn.BackColor = Color.LightGray;
            }
        }

        private void AnT_MouseClick(object sender, MouseEventArgs e)
        {
            if (_isTouchable)
            {
                Random rnd = new Random();
                // устанавливаем новые координаты взрыва
                explosion.SetNewPosition(0, 0, 10);
                // случайную силу
                explosion.SetNewPower(rnd.Next(20, 80));
                // и активируем сам взрыв
                explosion.Boooom(global_time);
            }
        }

        private void AnT_MouseMove(object sender, MouseEventArgs e)
        {
            mouseMoveX = e.X;
            mouseMoveY = e.Y;
        }

        private bool _isAquariumShow = false;

        private void Aquarium_btn_Click(object sender, EventArgs e)
        {
            _isAquariumShow = !_isAquariumShow;
            if (_isAquariumShow)
            {
                Aquarium_btn.BackColor = Color.LightGreen;
                ThreeD_btn.Enabled = false;
                comboBox1.Enabled = false;
                xBar.Enabled = false;
                trackBar1.Enabled = false;
                button1.Enabled = false;
                Touch_btn.Enabled = false;
                Sheep_btn.Enabled = false;
                Fractal_btn.Enabled = false;

                Glut.glutInitDisplayMode(Glut.GLUT_RGB | Glut.GLUT_DOUBLE | Glut.GLUT_DEPTH);

                Gl.glClearColor(0, 0, 0, 1);

                Gl.glViewport(0, 0, AnT.Width, AnT.Height);

                Gl.glMatrixMode(Gl.GL_PROJECTION);
                Gl.glLoadIdentity();

                Glu.gluPerspective(45, (float)AnT.Width / (float)AnT.Height, 0.1, 200);

                Gl.glMatrixMode(Gl.GL_MODELVIEW);
                Gl.glLoadIdentity();


                Gl.glEnable(Gl.GL_DEPTH_TEST);
                Gl.glEnable(Gl.GL_LIGHTING);
                Gl.glEnable(Gl.GL_LIGHT0);

                Gl.glBlendFunc(Gl.GL_SRC_ALPHA, Gl.GL_ONE_MINUS_SRC_ALPHA);
                Gl.glEnable(Gl.GL_BLEND);
                Gl.glEnable(Gl.GL_LINE_SMOOTH);
                Gl.glLineWidth(1.0f);
            }
            else
            {
                Aquarium_btn.BackColor = Color.LightGray;
                ThreeD_btn.Enabled = true;
                comboBox1.Enabled = false;
                xBar.Enabled = false;
                trackBar1.Enabled = false;
                button1.Enabled = false;
                Touch_btn.Enabled = false;
                Sheep_btn.Enabled = true;
                Fractal_btn.Enabled = true;

                Glut.glutInitDisplayMode(Glut.GLUT_RGB | Glut.GLUT_DOUBLE);

                Gl.glClearColor(0, 120, 0, 1);
                Gl.glViewport(0, 0, AnT.Width, AnT.Height);
                Gl.glMatrixMode(Gl.GL_PROJECTION);
                Gl.glLoadIdentity();

                Gl.glDisable(Gl.GL_DEPTH_TEST);
                Gl.glDisable(Gl.GL_LIGHTING);
                Gl.glDisable(Gl.GL_LIGHT0);

                Glu.gluOrtho2D(0.0, 30.0 * (float)AnT.Width / (float)AnT.Height, 0.0, 30.0);
                Gl.glMatrixMode(Gl.GL_MODELVIEW);
            }
        }

        private void Fractal_btn_Click(object sender, EventArgs e)
        {
            _isfractalNeeede = !_isfractalNeeede;

            if (_isfractalNeeede)
            {
                Fractal_btn.BackColor = Color.LightGreen;
            }
            else
            {
                Fractal_btn.BackColor = Color.LightGray;
            }
        }

        private bool _isfractalNeeede = false;

        private void Sheep_btn_Click(object sender, EventArgs e)
        {
            _isSheepAlive = !_isSheepAlive;

            if (_isSheepAlive)
            {
                Sheep_btn.BackColor = Color.LightGreen;
            }
            else
            {
                Sheep_btn.BackColor = Color.LightGray;
            }
        }

        private bool _isSheepAlive= false;

        private bool _is3dShow = false;
        private void ThreeD_btn_Click(object sender, EventArgs e)
        {
            _is3dShow = !_is3dShow;
            
            if (_is3dShow)
            {
                ThreeD_btn.BackColor = Color.LightGreen;
                comboBox1.Enabled = true;
                xBar.Enabled = true;
                trackBar1.Enabled = true;
                button1.Enabled = true;
                Touch_btn.Enabled = true;
                Sheep_btn.Enabled = false;
                Fractal_btn.Enabled = false;
                Aquarium_btn.Enabled = false;

                Glut.glutInitDisplayMode(Glut.GLUT_RGB | Glut.GLUT_DOUBLE | Glut.GLUT_DEPTH);

                Gl.glClearColor(0, 0, 0, 1);

                Gl.glViewport(0, 0, AnT.Width, AnT.Height);

                Gl.glMatrixMode(Gl.GL_PROJECTION);
                Gl.glLoadIdentity();

                Glu.gluPerspective(45, (float)AnT.Width / (float)AnT.Height, 0.1, 200);

                Gl.glMatrixMode(Gl.GL_MODELVIEW);
                Gl.glLoadIdentity();


                Gl.glEnable(Gl.GL_DEPTH_TEST);
                Gl.glEnable(Gl.GL_LIGHTING);
                Gl.glEnable(Gl.GL_LIGHT0);

                Gl.glBlendFunc(Gl.GL_SRC_ALPHA, Gl.GL_ONE_MINUS_SRC_ALPHA);
                Gl.glEnable(Gl.GL_BLEND);
                Gl.glEnable(Gl.GL_LINE_SMOOTH);
                Gl.glLineWidth(1.0f);
            } else
            {
                ThreeD_btn.BackColor = Color.LightGray;
                comboBox1.Enabled = false;
                xBar.Enabled = false;
                trackBar1.Enabled = false;
                button1.Enabled = false;
                Touch_btn.Enabled = false;
                Sheep_btn.Enabled = true;
                Fractal_btn.Enabled = true;
                Aquarium_btn.Enabled = true;

                Glut.glutInitDisplayMode(Glut.GLUT_RGB | Glut.GLUT_DOUBLE);

                Gl.glClearColor(0, 120, 0, 1);
                Gl.glViewport(0, 0, AnT.Width, AnT.Height);
                Gl.glMatrixMode(Gl.GL_PROJECTION);
                Gl.glLoadIdentity();

                Gl.glDisable(Gl.GL_DEPTH_TEST);
                Gl.glDisable(Gl.GL_LIGHTING);
                Gl.glDisable(Gl.GL_LIGHT0);

                Glu.gluOrtho2D(0.0, 30.0 * (float)AnT.Width / (float)AnT.Height, 0.0, 30.0);
                Gl.glMatrixMode(Gl.GL_MODELVIEW);
            }
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            string url = "";
            switch (comboBox1.SelectedIndex)
            {
                case 0: url = Path.GetFullPath("models\\dima.ase"); break;
                case 1: url = Path.GetFullPath("models\\vlad.ase"); break;
                case 2: url = Path.GetFullPath("models\\alisa.ase"); break;
                case 3: url = Path.GetFullPath("models\\petuh.ase"); break;
            }

            sheep = new anModelLoader();
            sheep.LoadModel(url);
        }
    }
}
