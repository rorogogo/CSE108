#CSE108 - Lab01
#Part 1 (Asking for #s, then adding sums, fail if input has a string or < 2 integers) Also have floats for #s

numberinput = input("Enter two or more numbers seperated by spaces: ")
numbers = numberinput.split(" ")
if (len(numbers) <= 1):
        raise Exception("You must input > 1 numbers!")
total = 0.0
for i in numbers:
    total = total + float(i)
print("The total is: " + str(total))



#Part 2 (Punishment automation: Ask for a sentence that they need to type, and the # of times the program needs to type it.)
sentence = input("Enter a sentence for the program to repeat: ")
punishmenttimes = int(input("\nEnter the amount of times (as an integer) you want the program to repeat the sentence: "))
for i in range(punishmenttimes):
    print(sentence)

#Part 3 (word count program that prompts user for a word, then parses PythonSummary.txt and counts the # of times it appears in the file and outputs it. This should work regardless of capitalization.)
wordquery = input("Enter a word that you want to find the number of instances within PythonSummary.txt: ")
with open("PythonSummary.txt", "r") as PythonSummary:
    text = PythonSummary.read().upper()
    file_contents = ""
    for char in text:
        if char.isalpha():
            file_contents += char
        else:
            file_contents += " "

    words = file_contents.split(" ")
    instances = 0
    for i in words:
        if(i.upper() == wordquery.upper()):
            instances = instances + 1
    print("The word appears " + str(instances) + " times within PythonSummary.txt")
PythonSummary.close()
file_contents = ""

#Part 4 (Class schedule formatting)
file = open("ClassesInput.txt", "r")
text = file.readline()
file_contents = text
Count = 0
for i in range(int(str(file_contents))):
        Count += 1
        Course_Department = file.readline().strip()
        Course_Number = file.readline().strip()
        Course_Name = file.readline().strip()
        print("Course " + str(Count) + " " + str(Course_Department) + " " + str(Course_Number) + ": " + str(Course_Name))
        Credits = file.readline().strip()
        print("Number of Credits: " + str(Credits))
        Lecture_Days = file.readline().strip()
        print("Days of Lectures: " + str(Lecture_Days))
        Start_Time = file.readline().strip()
        End_Time = file.readline().strip()
        print("Lecture Time: " + str(Start_Time) + " - " + str(End_Time))
        Avg_Grade = file.readline().strip()
        print("Stat on average, student get " + str(Avg_Grade) + " in this course")
file.close()
    

#Part 5 (Create a grades program that allows user to create in student class)
import json
with open("grades.txt", "r") as file:
    grades = json.load(file)
while True:
    print("\nGrade Menu")
    print("1. Add grade")
    print("2. Get grade")
    print("3. Edit grade")
    print("4. Delete grade")
    print("5. Exit")
    choice = input("Choose an option: ")
    if choice == "1":
        name = input("Enter student's full name: ")
        grade = float(input("Enter grade: "))
        grades[name] = grade

        with open("grades.txt", "w") as file:
            json.dump(grades, file, indent=3)

    elif choice == "2":
        name = input("Enter student's full name: ")
        if name in grades:
            print(f"{name}'s grade is {grades[name]}")
        else:
            print("Student not found.")

    elif choice == "3":
        name = input("Enter student's full name: ")
        if name in grades:
            new_grade = float(input("Enter new grade: "))
            grades[name] = new_grade
            with open("grades.txt", "w") as file:
                json.dump(grades, file, indent=1)
        else:
            print("Student not found.")
    elif choice == "4":
        name = input("Enter student's full name: ")
        if name in grades:
            del grades[name]

            with open("grades.txt", "w") as file:
                json.dump(grades, file, indent=1)
        else:
            print("Student not found.")
    elif choice == "5":
        break
    else:
        print("Please only type 1, 2, 3, 4, or 5.")
