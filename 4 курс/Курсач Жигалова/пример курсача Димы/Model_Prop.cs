    class Model_Prop
    {
        public Model_Prop()
        {
            pos_abs[0] = 0;
            pos_abs[1] = 0;
            pos_abs[2] = 0;

            maximum[0] = 0;
            maximum[1] = 0;
            maximum[2] = 0;

            minimum[0] = 0;
            minimum[1] = 0;
            minimum[2] = 0;

            rotating_angles[0] = 0;
            rotating_angles[1] = 0;
            rotating_angles[2] = 0;
        }

        public float[] pos_abs = new float[3];
        public float[] maximum = new float[3];
        public float[] minimum = new float[3];
        public float[] rotating_angles = new float[3];
    }