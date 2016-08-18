import shutil, errno, re

##############################
### OS FILE/FOLDER HELPERS ###
##############################

#Copies a directory to another directory
def copyanything(src, dst):
    try:
        shutil.copytree(src, dst)
    except OSError as exc: # python >2.5
        if exc.errno == errno.ENOTDIR:
            shutil.copy(src, dst)
        else: raise

##########################
### USER INPUT HELPERS ###
##########################

def get_input_regex(question, regex):
	answer = ""
	while True:
		answer = input(question + ": ")
		if(re.match(regex, answer)):
			return answer

	print("Invalid answer, must meet the following regex criteria: " + regex)


def get_input(question, valid_answers):
	answer = ""
	while True:
		answer = input(question + ": ")
		if answer in valid_answers:
			return answer

		invalid = "Invalid answer, expecting "
		for valid in valid_answers:
			invalid+= str(valid) + ", "

		print(invalid)

if __name__ == "__main__":
	print("utils.py is a helper file that shouldn't be called directly")