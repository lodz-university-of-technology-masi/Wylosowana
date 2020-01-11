package wylosowana.validator;

import wylosowana.model.Participant;

public class ParticipantValidator {
    public static boolean checkNull(Participant participant) {
        return participant != null;
    }
}