import org.w3c.dom.*;
import javax.xml.parsers.*;
import java.io.*;
import org.xml.sax.SAXException;

public class DOMParser {
    public static void main(String[] args) {
        try {
            File inputFile = new File("kirill_example.xml");
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(inputFile);
            document.getDocumentElement().normalize();

            Node userNode = document.getElementsByTagName("ns:user").item(0);
            String userEmail = ((Element) userNode).getElementsByTagName("email").item(0).getTextContent();
            String userName = ((Element) userNode).getElementsByTagName("full_name").item(0).getTextContent();
            
            Node requestNode = document.getElementsByTagName("ns:request").item(0);
            String requestStartPoint = ((Element) requestNode).getElementsByTagName("start_point").item(0).getTextContent();
            String requestEndPoint = ((Element) requestNode).getElementsByTagName("end_point").item(0).getTextContent();
            String requestStatus = ((Element) requestNode).getElementsByTagName("status").item(0).getTextContent();
            
            NodeList roadSegmentList = document.getElementsByTagName("ns:roadSegment");
            StringBuilder htmlContent = new StringBuilder();

            htmlContent.append("<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n")
                       .append("<meta charset=\"UTF-8\">\n")
                       .append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n")
                       .append("<title>XML Data</title>\n</head>\n<body>\n<h1>Road Segments Data</h1>\n")
                       .append("<h2>User Info</h2>\n")
                       .append("<p><strong>Email:</strong> ").append(userEmail).append("</p>\n")
                       .append("<p><strong>Name:</strong> ").append(userName).append("</p>\n")
                       .append("<h2>Request Info</h2>\n")
                       .append("<p><strong>Start Point:</strong> ").append(requestStartPoint).append("</p>\n")
                       .append("<p><strong>End Point:</strong> ").append(requestEndPoint).append("</p>\n")
                       .append("<p><strong>Status:</strong> ").append(requestStatus).append("</p>\n")
                       .append("<h2>Road Segments</h2>\n")
                       .append("<table border=\"1\">\n<thead>\n<tr>\n<th>ID</th>\n<th>Start Coord</th>\n<th>End Coord</th>\n")
                       .append("<th>Length (m)</th>\n<th>Quality Factor</th>\n<th>User Intensity</th>\n<th>Efficiency</th>\n</tr>\n</thead>\n<tbody>");

            double totalLength = 0;

            for (int i = 0; i < roadSegmentList.getLength(); i++) {
                Node node = roadSegmentList.item(i);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    String id = element.getElementsByTagName("id").item(0).getTextContent();
                    String startCoord = element.getElementsByTagName("start_coord").item(0).getTextContent();
                    String endCoord = element.getElementsByTagName("end_coord").item(0).getTextContent();
                    double length = Double.parseDouble(element.getElementsByTagName("length").item(0).getTextContent());
                    double qualityFactor = Double.parseDouble(element.getElementsByTagName("quality_factor").item(0).getTextContent());
                    double userIntensity = Double.parseDouble(element.getElementsByTagName("user_intensity").item(0).getTextContent());

                    double efficiency = (qualityFactor * userIntensity) / length;

                    htmlContent.append("<tr>\n")
                               .append("<td>").append(id).append("</td>\n")
                               .append("<td>").append(startCoord).append("</td>\n")
                               .append("<td>").append(endCoord).append("</td>\n")
                               .append("<td>").append(length).append("</td>\n")
                               .append("<td>").append(qualityFactor).append("</td>\n")
                               .append("<td>").append(userIntensity).append("</td>\n")
                               .append("<td>").append(String.format("%.2f", efficiency)).append("</td>\n")
                               .append("</tr>");

                    totalLength += length;
                }
            }

            htmlContent.append("</tbody>\n<tfoot>\n<tr>\n<td colspan=\"3\">Total Length</td>\n")
                       .append("<td>").append(totalLength).append("</td>\n<td colspan=\"3\"></td>\n</tr>\n</tfoot>\n</table>\n</body>\n</html>");

            System.out.println(htmlContent.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}