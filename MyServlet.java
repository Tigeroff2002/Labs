package ru.vlsu.ispi;

import java.io.*;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Calendar;
import java.text.ParseException;
import java.lang.*;
/**
 *
 * @author ProGa
 */
public class MyServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* Get parameters from request: */
            String userBirthdayDate = request.getParameter("date");
			String userName = request.getParameter("name");
            System.out.println("isFormal parameter value: " + request.getParameter("isFormal"));
            boolean useFormalStyle = "on".equals(request.getParameter("isFormal"));
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet SampleServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet SampleServlet at " + request.getContextPath() + "</h1>");
            if(useFormalStyle){
                out.println("<h2>Hello, " + userName + "! Glad to see you!</h2>");
            }
			else{
                out.println("<h2>Hi, " + userName + "! What's up?</h2>");
            }
            out.println("<h2>" + getDays(userBirthdayDate) + "</h2>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
	
	    private String getDays(String birthday){
			SimpleDateFormat format = new SimpleDateFormat("dd.MM.yyyy");
			Date birthdayDate = null;
		try {
		    	birthdayDate = format.parse(birthday);
		}
		catch(ParseException e) {
		    return "You input the wrong date! Try to use date in format: dd.mm.yyyy";
		}
		Date now = new Date();
		birthdayDate.setYear(now.getYear());
		Long days = new Long((birthdayDate.getTime() - now.getTime()) / 1000 / 60 / 60 / 24);
		if (days >= 0)
		    days += 1;
		if ((birthdayDate.getDay() == now.getDay()) && (days < 7))
		    return "Today is your birthday!";
		else
		    if (days >= 0)
		    	return "Remained " + days.toString() + " days for your next birthday in this year";
            else
                return "Осталось " + (new Long(days + 365)).toString() + " days for your next birthday in next year";
	}
}