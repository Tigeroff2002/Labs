import org.xml.sax.*;
import org.xml.sax.helpers.*;
import javax.xml.parsers.*;
import java.io.*;

public class SAXParserExample {
    public static void main(String[] args) {
        try {
            File inputFile = new File("kirill_example.xml");
            SAXParserFactory factory = SAXParserFactory.newInstance();
            SAXParser saxParser = factory.newSAXParser();

            RoadSegmentHandler handler = new RoadSegmentHandler();
            saxParser.parse(inputFile, handler);

            System.out.println(handler.generateHTML());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class User {
    private String id;
    private String email;
    private String fullName;
    private String role;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}

class Request {
    private String id;
    private String userId;
    private String startPoint;
    private String endPoint;
    private String datetime;
    private String preferenceParameter;
    private String status;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getStartPoint() { return startPoint; }
    public void setStartPoint(String startPoint) { this.startPoint = startPoint; }

    public String getEndPoint() { return endPoint; }
    public void setEndPoint(String endPoint) { this.endPoint = endPoint; }

    public String getDatetime() { return datetime; }
    public void setDatetime(String datetime) { this.datetime = datetime; }

    public String getPreferenceParameter() { return preferenceParameter; }
    public void setPreferenceParameter(String preferenceParameter) { this.preferenceParameter = preferenceParameter; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

class RoadSegment {
    private String id;
    private String cityId;
    private String startCoord;
    private String endCoord;
    private double length;
    private double qualityFactor;
    private double userIntensity;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCityId() { return cityId; }
    public void setCityId(String cityId) { this.cityId = cityId; }

    public String getStartCoord() { return startCoord; }
    public void setStartCoord(String startCoord) { this.startCoord = startCoord; }

    public String getEndCoord() { return endCoord; }
    public void setEndCoord(String endCoord) { this.endCoord = endCoord; }

    public double getLength() { return length; }
    public void setLength(double length) { this.length = length; }

    public double getQualityFactor() { return qualityFactor; }
    public void setQualityFactor(double qualityFactor) { this.qualityFactor = qualityFactor; }

    public double getUserIntensity() { return userIntensity; }
    public void setUserIntensity(double userIntensity) { this.userIntensity = userIntensity; }
}

class RoadSegmentHandler extends DefaultHandler {
    private StringBuilder htmlContent;
    private double totalLength;
    private String currentElement;
    private RoadSegment currentSegment;
    private User currentUser;
    private Request currentRequest;

    public RoadSegmentHandler() {
        htmlContent = new StringBuilder();
        totalLength = 0;
    }

    @Override
    public void startDocument() {
        htmlContent.append("<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n")
                   .append("<meta charset=\"UTF-8\">\n")
                   .append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n")
                   .append("<title>XML Data</title>\n</head>\n<body>\n<h1>Road Segments Data</h1>\n");
    }

    @Override
    public void endDocument() {
        htmlContent.append("</body>\n</html>");
    }

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) {
        currentElement = qName;
        if ("ns:roadSegment".equals(currentElement)) {
            currentSegment = new RoadSegment();
        } else if ("ns:user".equals(currentElement)) {
            currentUser = new User();
        } else if ("ns:request".equals(currentElement)) {
            currentRequest = new Request();
        }
    }

    @Override
    public void characters(char[] ch, int start, int length) {
        String content = new String(ch, start, length).trim();
        if ("email".equals(currentElement)) {
            currentUser.setEmail(content);
        } else if ("full_name".equals(currentElement)) {
            currentUser.setFullName(content);
        } else if ("role".equals(currentElement)) {
            currentUser.setRole(content);
        } else if ("id".equals(currentElement)) {
            if (currentSegment != null) {
                currentSegment.setId(content);
            } else if (currentRequest != null) {
                currentRequest.setId(content);
            } else if (currentUser != null) {
                currentUser.setId(content);
            }
        } else if ("start_coord".equals(currentElement)) {
            if (currentSegment != null) {
                currentSegment.setStartCoord(content);
            }
        } else if ("end_coord".equals(currentElement)) {
            if (currentSegment != null) {
                currentSegment.setEndCoord(content);
            }
        } else if ("length".equals(currentElement)) {
            if (currentSegment != null) {
                currentSegment.setLength(Double.parseDouble(content));
            }
        } else if ("quality_factor".equals(currentElement)) {
            if (currentSegment != null) {
                currentSegment.setQualityFactor(Double.parseDouble(content));
            }
        } else if ("user_intensity".equals(currentElement)) {
            if (currentSegment != null) {
                currentSegment.setUserIntensity(Double.parseDouble(content));
            }
        } else if ("start_point".equals(currentElement)) {
            if (currentRequest != null) {
                currentRequest.setStartPoint(content);
            }
        } else if ("end_point".equals(currentElement)) {
            if (currentRequest != null) {
                currentRequest.setEndPoint(content);
            }
        } else if ("datetime".equals(currentElement)) {
            if (currentRequest != null) {
                currentRequest.setDatetime(content);
            }
        } else if ("preference_parameter".equals(currentElement)) {
            if (currentRequest != null) {
                currentRequest.setPreferenceParameter(content);
            }
        } else if ("status".equals(currentElement)) {
            if (currentRequest != null) {
                currentRequest.setStatus(content);
            }
        }
    }

    @Override
    public void endElement(String uri, String localName, String qName) {
        if ("ns:roadSegment".equals(qName)) {
            double efficiency = (currentSegment.getQualityFactor() * currentSegment.getUserIntensity()) / currentSegment.getLength();
            htmlContent.append("<tr>\n")
                       .append("<td>").append(currentSegment.getId()).append("</td>\n")
                       .append("<td>").append(currentSegment.getStartCoord()).append("</td>\n")
                       .append("<td>").append(currentSegment.getEndCoord()).append("</td>\n")
                       .append("<td>").append(currentSegment.getLength()).append("</td>\n")
                       .append("<td>").append(currentSegment.getQualityFactor()).append("</td>\n")
                       .append("<td>").append(currentSegment.getUserIntensity()).append("</td>\n")
                       .append("<td>").append(String.format("%.2f", efficiency)).append("</td>\n")
                       .append("</tr>");
            totalLength += currentSegment.getLength();
        }
    }

    public String generateHTML() {
        htmlContent.append("<h2>User Info</h2>\n")
                   .append("<p><strong>Email:</strong> ").append(currentUser.getEmail()).append("</p>\n")
                   .append("<p><strong>Name:</strong> ").append(currentUser.getFullName()).append("</p>\n")
                   .append("<h2>Request Info</h2>\n")
                   .append("<p><strong>Start Point:</strong> ").append(currentRequest.getStartPoint()).append("</p>\n")
                   .append("<p><strong>End Point:</strong> ").append(currentRequest.getEndPoint()).append("</p>\n")
                   .append("<p><strong>Status:</strong> ").append(currentRequest.getStatus()).append("</p>\n")
                   .append("<h2>Road Segments</h2>\n")
                   .append("<table border=\"1\">\n<thead>\n<tr>\n<th>ID</th>\n<th>Start Coord</th>\n<th>End Coord</th>\n")
                   .append("<th>Length (m)</th>\n<th>Quality Factor</th>\n<th>User Intensity</th>\n<th>Efficiency</th>\n</tr>\n</thead>\n<tbody>");
        
        htmlContent.append("</tbody>\n<tfoot>\n<tr>\n<td colspan=\"3\">Total Length</td>\n")
                   .append("<td>").append(totalLength).append("</td>\n<td colspan=\"3\"></td>\n</tr>\n</tfoot>\n</table>\n");
        
        return htmlContent.toString();
    }
}