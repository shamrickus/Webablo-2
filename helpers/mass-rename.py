import sys, os, re, math
from utils import *

NUMBER_OF_DIRECTIONS = 16
DIRECTION_MAPPING = {0: "S", 1: "SSW", 2: "SW", 3: "WSW", 4: "W", 5: "WNW", 6: "NW", 7: "NNw", 8: "N", 9: "NNE",10: "NE", 11: "ENE", 12: "E", 13: "ESE", 14: "SE", 15: "SSE"}

os.chdir("sprites_extracted")

os.chdir(get_input("Which Class should we goto?", os.listdir()))

fpa = int(get_input_regex("How many frames per animation?", "^[1-9][0-9]*$"))

if(get_input("Rename entire folder?", ["yes", "no"]) == "yes"):
	filenames = next(os.walk(os.getcwd()))[2]

	if(len(filenames) % NUMBER_OF_DIRECTIONS != 0):
		print("Uneven number of frames!!!")

	#Remove .png from file names
	filenames = [i.split('.', 1)[0] for i in filenames]
	#Sort numericly instaed of by string
	filenames = sorted(filenames, key=int)

	for i, file in enumerate(filenames):
		frameNumber = i % fpa
		dirNumber = math.modf(i / NUMBER_OF_DIRECTIONS)[1]
		direction = DIRECTION_MAPPING[dirNumber]

		#print(str(i) + ", " + str(frameNumber) + ", " + direction +", " + file)

		os.rename(file + ".png", "Paladin-" + str(frameNumber) + "-" + direction + ".png")



