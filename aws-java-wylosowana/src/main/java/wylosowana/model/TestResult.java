package wylosowana.model;

public class TestResult {
    private String name;
    private String result;

    public TestResult(String name, String result) {
        this.name = name;
        this.result = result;
    }

    public String getTestId() {
        return name;
    }

    public void setTestId(String name) {
        this.name = name;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
