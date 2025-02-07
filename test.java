// Pet.java

public class Pet {

    // Attributes
    private String petType;
    private String petName;
    private int petAge;
    private int dogSpaces;
    private int catSpaces;
    private int daysStay;
    private double amountDue;

    // Constructor
    public Pet(String petType, String petName, int petAge, int dogSpaces, int catSpaces, int daysStay, double amountDue) {
        this.petType = petType;
        this.petName = petName;
        this.petAge = petAge;
        this.dogSpaces = dogSpaces;
        this.catSpaces = catSpaces;
        this.daysStay = daysStay;
        this.amountDue = amountDue;
    }

    // Accessors (Getters)
    public String getPetType() {
        return petType;
    }

    public String getPetName() {
        return petName;
    }

    public int getPetAge() {
        return petAge;
    }

    public int getDogSpaces() {
        return dogSpaces;
    }

    public int getCatSpaces() {
        return catSpaces;
    }

    public int getDaysStay() {
        return daysStay;
    }

    public double getAmountDue() {
        return amountDue;
    }

    // Mutators (Setters)
    public void setPetType(String petType) {
        this.petType = petType;
    }

    public void setPetName(String petName) {
        this.petName = petName;
    }

    public void setPetAge(int petAge) {
        this.petAge = petAge;
    }

    public void setDogSpaces(int dogSpaces) {
        this.dogSpaces = dogSpaces;
    }

    public void setCatSpaces(int catSpaces) {
        this.catSpaces = catSpaces;
    }

    public void setDaysStay(int daysStay) {
        this.daysStay = daysStay;
    }

    public void setAmountDue(double amountDue) {
        this.amountDue = amountDue;
    }
}
