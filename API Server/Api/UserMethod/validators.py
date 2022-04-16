import re

# Regex Patterns
email_Pattern = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
phoneNum_Pattern = re.compile(r'\d{3}-\d{3,4}-\d{4}')
name_Pattern = re.compile(r'[ㄱ-ㅣ가-힣]{2,10}')
nick_Pattern = re.compile(r'[ㄱ-ㅣ가-힣a-zA-Z]{2,10}')
id_Pattern = re.compile(r'[a-zA-Z0-9]{5,50}')


def CheckValidAccount(inputData):
    exceptions_reason = []

    # Email Checker
    if re.match(email_Pattern, inputData['user_Email']):
        pass
    else:
        exceptions_reason.append('Email')

    # Phone Checker
    if re.match(phoneNum_Pattern, inputData['user_Phone']):
        pass
    else:
        exceptions_reason.append('Phone')

    # Name Checker
    if re.match(name_Pattern, inputData['user_Name']):
        pass
    else:
        exceptions_reason.append('Name')

    # Nick Checker
    if re.match(nick_Pattern, inputData['user_Nick']):
        pass
    else:
        exceptions_reason.append('Nick')

    # Id Checker
    if re.match(id_Pattern, inputData['user_Id']):
        pass
    else:
        exceptions_reason.append('Id')

    # # Driver Checker
    # if re.match(id_Pattern, inputData['user_Driver']):
    #     pass
    # else:
    #     exceptions_reason.append('Driver')

    return exceptions_reason
