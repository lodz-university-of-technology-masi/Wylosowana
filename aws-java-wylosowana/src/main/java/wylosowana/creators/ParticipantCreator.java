package wylosowana.creators;

import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.amazonaws.services.cognitoidp.model.UserType;
import wylosowana.model.Participant;

public class ParticipantCreator {
    public static Participant CreateParticipant(UserType userType){
        String email = "", name = "", surname = "", id = "",  profile ="";
        for (AttributeType attribute : userType.getAttributes()) {
            if (attribute.getName().equals("sub")) {
                id = attribute.getValue();
            }
            if (attribute.getName().equals("email")) {
                email = attribute.getValue();
            }
            if (attribute.getName().equals("name")) {
                name = attribute.getValue();
            }
            if (attribute.getName().equals("family_name")) {
                surname = attribute.getValue();
            }
            if (attribute.getName().equals("profile")) {
                profile = attribute.getValue();
            }
        }

        return new Participant(id, userType.getUsername(), email, name, surname, profile);
    }
}
