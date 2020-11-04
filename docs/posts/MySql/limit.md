# union(可以将查询结果集相加)

找出工作岗位是salesman和manager的员工

```
mysql> select ename,job from emp where job in ('salesman','manager');
+--------+----------+
| ename  | job      |
+--------+----------+
| ALLEN  | SALESMAN |
| WARD   | SALESMAN |
| JONES  | MANAGER  |
| MARTIN | SALESMAN |
| BLAKE  | MANAGER  |
| CLARK  | MANAGER  |
| TURNER | SALESMAN |
+--------+----------+
7 rows in set (0.00 sec)
```

也可以这么写
```
mysql> select ename,job from emp where job='salesman'
    -> union
    -> select ename,job from emp where job='manager';
+--------+----------+
| ename  | job      |
+--------+----------+
| ALLEN  | SALESMAN |
| WARD   | SALESMAN |
| MARTIN | SALESMAN |
| TURNER | SALESMAN |
| JONES  | MANAGER  |
| BLAKE  | MANAGER  |
| CLARK  | MANAGER  |
+--------+----------+
```

```
mysql> select ename,sal from emp
    -> union
    -> select sal from emp;
ERROR 1222 (21000): The used SELECT statements have a different number of columns
```

记住union的列数一定要相同

## limit（重点中的重点，分页查询全靠这个）

1. limit是mysql特有的，其他数据库中没有，不通用，（Oracle中有一个相同的机制，叫做rownum）
2. limit取结果集中的部分数据，这是它的左右
3. 语法机制：limit startIndex length

startIndex：起始位置，length：取多少个

取出工资的前5名

```
mysql> select ename,sal from emp order by sal desc limit 0, 5;
+-------+---------+
| ename | sal     |
+-------+---------+
| KING  | 5000.00 |
| SCOTT | 3000.00 |
| FORD  | 3000.00 |
| JONES | 2975.00 |
| BLAKE | 2850.00 |
+-------+---------+
5 rows in set (0.00 sec)
```

如果limit后面只写一个数字那么这个数字为length，startIndex为0

limit为sql语句最后执行的一个环节

```
select    5
  ...
from      1
  ...
where     2
  ...
group by  3
  ...
having    4
  ...
order by  6
  ...
limit     7
  ...
```

找出工资排名在第4到第9的员工

```
mysql> select ename,sal from emp order by sal desc limit 3, 6;
+--------+---------+
| ename  | sal     |
+--------+---------+
| JONES  | 2975.00 |
| BLAKE  | 2850.00 |
| CLARK  | 2450.00 |
| ALLEN  | 1600.00 |
| TURNER | 1500.00 |
| MILLER | 1300.00 |
+--------+---------+
6 rows in set (0.00 sec)
```

通用的标准分页sql？

每页显示pageSize条记录

第pageNo页：limit (pageNo - 1)*pageSize,pageSize