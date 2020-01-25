import csv

with open('quests.csv') as csvfile:
    readCSV = csv.reader(csvfile,delimiter=",")
    totalPoints = 0
    for row in readCSV:
        
        #ignore the column labels row
        if (row[1] != 'VALUE'):
            totalPoints = totalPoints + float(row[1])
    print("Total Public Points: ", totalPoints)
    
    #I manually checked the locked pages to get their point values
    #lockPageTotal = 2+1+4+2+5+1+2+4+2
    #print('Total Counting Locked:', totalPoints+lockPageTotal)