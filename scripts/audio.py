import pygame

song = '/home/edwin/Music/testify.mp3'

pygame.init()
pygame.mixer.init()
pygame.mixer.music.load(song)
pygame.mixer.music.play()
pygame.event.wait()
