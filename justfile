alias c := addcommit

addcommit FILE MSG:
    git add {{FILE}}
    git commit -m "{{MSG}}"