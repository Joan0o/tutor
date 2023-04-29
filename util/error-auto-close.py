#pip install pywin32
import win32gui
import win32con
import sched
import time


def winEnumHandler(hwnd, ctx):
    if win32gui.IsWindowVisible(hwnd):
        #print (hex(hwnd), win32gui.GetWindowText( hwnd ))
        if win32gui.GetWindowText(hwnd) == "Error Occurred" or win32gui.GetWindowText(hwnd) == "Could Not Connect To Server":
            win32gui.PostMessage(hwnd, win32con.WM_CLOSE, 0, 0)
            print("Closing")


s = sched.scheduler(time.time, time.sleep)


def do_something(sc):
    print("Checking...")
    # do your stuff
    win32gui.EnumWindows(winEnumHandler, None)
    sc.enter(60, 1, do_something, (sc,))


s.enter(60, 1, do_something, (s,))
s.run()
