import random
import time
random_step = [6,9,9,9,7,8]

step = 0

while True:
    if (random.randint(1, 10) <= random_step[step]):
        step += 1
    else:
        if step != 0:
            step = step - 1
    print("Монстр на шаге", step)

    if step == 6:
        print("Монстр у окна")
        step = 0
    time.sleep(2)
        
        