<?php

namespace App\Enums;

use App\Traits\Enum;

enum Gender: string
{
    use Enum;

    case MALE = 'male';
    case FEMALE = 'female';
}
