---
templateKey: 'blog-post'
title: 'Using Records in VHDL'
date: 2018-06-09
description: >-
    Using records in VHDL designs can save you dozens of hours and hundreds of lines in the long run.
tags:
  - VHDL
  - Style
published: true
---
In larger FPGA designs, we often have a large group of related signals that make up some complex bus or protocol, like PCIe, AXI, DDR, etc. We often want to apply some operation to the entire group of signals, such as pipelining them, muxing them, putting them into a fifo, or using them in a port in some level of the design. This is when records really shine.

##What are Records?
Records are a collection of signals in one named object, similar to structs in C.

```vhdl
architecture example_arch of example is
    type ex_record is record
        a : std_logic;
        b : std_logic_vector(15 downto 0);
        c : unsigned(31 downto 0);
    end record ex_record;

    signal rec is ex_record;

begin

    rec.a <= enable;
    rec.b <= halfword_vec;
    rec.c <= uint_a;

```

##Records Make Designs Easier to Understand and Less Error Prone
Records take advantage of VHDL's strict typing. Signals of a certain type can only be assigned to ports, signals, and variables of the same type or a parent type. When working with a known interface (like a bus) defined as a set of separate signals, assigning them all is tedious and prone to copy-paste errors. Using a record removes the possibility of these errors, and let the designer reason about abstract interfaces between components instead of individual signals.

This is what a component port assignment for an AXI bus looks like with just `vhdl>std_logic_vector`:

```vhdl
example_inst : axi_example_peripheral
    port_map(
        clk               => clk,
        data              => data,
        s_axi_gp0_arvalid => periph_axi_arvalid,
        s_axi_gp0_awvalid => periph_axi_awvalid,
        s_axi_gp0_bready  => periph_axi_bready,
        s_axi_gp0_rready  => periph_axi_rready,
        s_axi_gp0_wlast   => periph_axi_wlast,
        s_axi_gp0_wvalid  => periph_axi_wvalid,
        s_axi_gp0_arid    => periph_axi_arid,
        s_axi_gp0_awid    => periph_axi_awid,
        s_axi_gp0_wid     => periph_axi_wid,
        s_axi_gp0_arburst => periph_axi_arburst,
        s_axi_gp0_arlock  => periph_axi_arlock,
        s_axi_gp0_arsize  => periph_axi_arsize,
        s_axi_gp0_awburst => periph_axi_awburst,
        s_axi_gp0_awlock  => periph_axi_awlock,
        s_axi_gp0_awsize  => periph_axi_awsize,
        s_axi_gp0_arprot  => periph_axi_arprot,
        s_axi_gp0_awprot  => periph_axi_awprot,
        s_axi_gp0_araddr  => periph_axi_araddr,
        s_axi_gp0_awaddr  => periph_axi_awaddr,
        s_axi_gp0_wdata   => periph_axi_wdata,
        s_axi_gp0_arcache => periph_axi_arcache,
        s_axi_gp0_arlen   => periph_axi_arlen,
        s_axi_gp0_arqos   => periph_axi_arqos,
        s_axi_gp0_awcache => periph_axi_awcache,
        s_axi_gp0_awlen   => periph_axi_awlen,
        s_axi_gp0_awqos   => periph_axi_awqos,
        s_axi_gp0_wstrb   => periph_axi_wstrb,
        s_axi_gp0_aclk    => periph_axi_aclk,
        s_axi_gp0_arready => periph_axi_arready,
        s_axi_gp0_awready => periph_axi_awready,
        s_axi_gp0_bvalid  => periph_axi_bvalid,
        s_axi_gp0_rlast   => periph_axi_rlast,
        s_axi_gp0_rvalid  => periph_axi_rvalid,
        s_axi_gp0_wready  => periph_axi_wready,
        s_axi_gp0_bid     => periph_axi_bid,
        s_axi_gp0_rid     => periph_axi_rid,
        s_axi_gp0_bresp   => periph_axi_bresp,
        s_axi_gp0_rresp   => periph_axi_rresp,
        s_axi_gp0_rdata   => periph_axi_rdata,
    );
```
This is what the same port assignment can look like using record types:
```vhdl
example_inst : axi_example_peripheral
    port_map(
        clk           => clk,
        data          => data,
        s_axi_gp0_in  => periph_axi.in,
        s_axi_gp0_out => periph_axi.out
    );
```
The individual protocol signals are defined in the type, and they all get assigned at once instead of individually.
Now imagine the data from this peripheral needs to be delayed by one clock cycle to line up correctly with another part of the design, or that there are two data sources into this peripheral that must be muxed. Which code example would be easier to change?

##How to Use Records in A Design
The most effective way to define custom record types is to put these type definitions in a package that gets called into other files. This allows the use of these types in all parts of the design, including in entity definitions.

```vhdl
library ieee;
use ieee.std_logic_1164.all;

package my_package is

    --Define two collections of signals, one for each direction.
    type from_AXI_master is record
        arvalid : std_logic;
        awvalid : std_logic;
        bready : std_logic;
        rready : std_logic;
        wlast : std_logic;
        wvalid : std_logic;
        arid : std_logic_vector(11 downto 0);
        awid : std_logic_vector(11 downto 0);
        wid : std_logic_vector(11 downto 0);
        arburst : std_logic_vector(1 downto 0);
        arlock : std_logic_vector(1 downto 0);
        arsize : std_logic_vector(2 downto 0);
        awburst : std_logic_vector(1 downto 0);
        awlock : std_logic_vector(1 downto 0);
        awsize : std_logic_vector(2 downto 0);
        arprot : std_logic_vector(2 downto 0);
        awprot : std_logic_vector(2 downto 0);
        araddr : std_logic_vector(31 downto 0);
        awaddr : std_logic_vector(31 downto 0);
        wdata : std_logic_vector(31 downto 0);
        arcache : std_logic_vector(3 downto 0);
        arlen : std_logic_vector(3 downto 0);
        arqos : std_logic_vector(3 downto 0);
        awcache : std_logic_vector(3 downto 0);
        awlen : std_logic_vector(3 downto 0);
        awqos : std_logic_vector(3 downto 0);
        wstrb : std_logic_vector(3 downto 0);
    end record from_AXI_master;

    type to_AXI_master is record
        aclk : std_logic;
        arready : std_logic;
        awready : std_logic;
        bvalid : std_logic;
        rlast : std_logic;
        rvalid : std_logic;
        wready : std_logic;
        bid : std_logic_vector(11 downto 0);
        rid : std_logic_vector(11 downto 0);
        bresp : std_logic_vector(1 downto 0);
        rresp : std_logic_vector(1 downto 0);
        rdata : std_logic_vector(31 downto 0);
    end record to_AXI_master;

    --Combine the two types together to have the complete AXI bus in one signal internally
    type AXI_slave is record
        out : to_AXI_master;
        in  : from_AXI_master;
    end record AXI_slave;

end my_package;
```
Then in the AXI peripheral file:
```vhdl
library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

--Declare the package
use work.my_package.all;

entity axi_example_peripheral is
  port (
    clk           : in std_logic;
    data          : in std_logic_vector(31 downto 0);
    m_axi_gp0_in  : in from_AXI_master;
    m_axi_gp0_out : out to_AXI_master;
    );
end axi_example_peripheral;

architecture arch of ddr3_controller is
    signal AXI_i : AXI_slave; --An internal AXI bus to do some processing
    signal axi_write_data : std_logic_vector(31 downto 0);
begin
    AXI_i.in <= m_axi_gp0_in;
    AXI_i.out <= m_axi_gp0_out;
    axi_write_data <= AXI_i.in.wdata;

    --etc

end arch;
```

The internals of the AXI protocol have been abstracted away, and the designer can reason about it on a higher level. These new types can also be used as function inputs/outputs, and even combined into still more abstract types (for instance, a bus array).

##Conclusion
Records are a great way of using VHDL's typing system to abstract away complex and verbose interfaces and protocols. They make designs easier to reason about, easier to change, and higher level.